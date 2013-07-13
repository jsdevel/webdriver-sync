/*!
 * Copyright 2013 Joseph Spencer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(){
var path = require("path");
var java = require("java");
var os   = require('os');
var isWin=/win/.test(os.platform());
var binaryDir = path.resolve(
   process.env[isWin ? 'USERPROFILE':'HOME'],
   '.webdriver-sync'
);
var seleniumJarPath=path.resolve(
   binaryDir, 'selenium-server-standalone.jar'
);
var pathToChromeDriver=path.resolve(binaryDir, 'chromedriver');
java.classpath.push(seleniumJarPath);
java.callStaticMethodSync(
   "java.lang.System",
   "setProperty",
   "webdriver.chrome.driver",
   pathToChromeDriver
);
var HtmlUnitDriverClass =
   java.import('org.openqa.selenium.htmlunit.HtmlUnitDriver');
var ChromeDriverClass =
   java.import('org.openqa.selenium.chrome.ChromeDriver');
var FirefoxDriverClass=
   java.import('org.openqa.selenium.firefox.FirefoxDriver');

var findElements=function(base, by){
   return collectionToArray(base.findElementsSync(by), function(item){
      return new WebElement(item);
   });
};
var collectionToArray=function(collection, mapper){
   var size=collection.sizeSync();
   var i=0;
   var array=[];
   var _mapper=typeof mapper === 'function' ?
                        mapper :
                        function(item){return item;};
   for(;i<size;i++){
      array.push(
         _mapper(collection.getSync(i))
      );
   }
   return array;
};

function UserAndPassword(username, password){
   this.getUsername=function(){
      return username;
   };
   this.getPassword=function(){
      return password;
   };
}
var Alert=(function(){
   function Alert(alert){
      this.accept=function(){
         alert.acceptSync();
      };
      this.authenticateUsing=function(credentials){
         if(!(credentials instanceof UserAndPassword)){
            throw new Error(
               "credentials must be an instance of UserAndPassword"
            );
         }
         alert.authenticateUsingSync(java.newInstanceSync(
            'org.openqa.selenium.security.UserAndPassword',
            credentials.getUsername(),
            credentials.getPassword()
         ));
      };
      this.dismiss=function(){
         alert.dismissSync();
      };
      this.getText=function(){
         return alert.getTextSync();
      };
      this.sendKeys=function(){
         alert.sendKeysSync();
      };
   }
   return Alert;
})();
var WebDriverOptions=(function(){
   function Options(options){
      /** TODO
      this.addCookie=function(cookie){
         options.addCookieSync(cookie);
      };
      */
      this.deleteAllCookies=function(){
         options.deleteAllCookiesSync();
      };
      this.deleteCookie=function(cookie){
         options.deleteCookieSync(cookie);
      };
      this.deleteCookieNamed=function(name){
         options.deleteCookieNamedSync(name);
      };
      /**TODO
      /
       * @param {string} name
       * @returns {org.openqa.selenium.Cookie}
       /
      this.getCookieNamed=function(name){
         options.getCookieNamedSync(name);
      };
      this.getCookies=function(){
         return collectionToArray(navigation.getCookiesSync());
      };
      */

/**
WebDriver.ImeHandler	ime()
Returns the interface for controlling IME engines to generate complex-script input.
Logs	logs()
Gets the Logs interface used to fetch different types of logs.
WebDriver.Timeouts	timeouts()
Returns the interface for managing driver timeouts.
WebDriver.Window	window()
Returns the interface for managing the current window.
      */
   }
   return Options;
})();
var WebDriverNavigation=(function(){
   function Navigation(navigation){
      this.back=function(){
         navigation.backSync();
      };
      this.forward=function(){
         navigation.forwardSync();
      };
      this.refresh=function(){
         navigation.refreshSync();
      };
      this.to=function(url){
         navigation.toSync(url);
      };
   }
   return Navigation;
})();
var WebDriverTargetLocator=(function(){
   function TargetLocator(locator){
      this.activeElement=function(){
         return new WebElement(
            locator.activeElementSync()
         );
      };
      this.alert=function(){
         return new Alert(locator.alertSync());
      };

      this.defaultContent=function(){
         return new DecoratedDriver(
            locator.defaultContentSync()
         );
      };
      this.frame=function(int){
         return new DecoratedDriver(locator.frameSync(int));
      };
      this.frame=function(name){
         return new DecoratedDriver(locator.frameSync(name));
      };
      this.frame=function(el){
         return new DecoratedDriver(locator.frameSync(el));
      };
      this.window=function(name){
         return new DecoratedDriver(locator.windowSync(name));
      };
   }
   return TargetLocator;
})();
var Point=(function(){
   function Point(point){
      this.getX=function(){
         return point.getXSync();
      };
      this.getY=function(){
         return point.getYSync();
      };
      this.move=function(x, y){
         return point.moveSync(x, y);
      };
      this.moveBy=function(xOff, yOff){
         return point.moveBySync(xOff, yOff);
      };
      this.toString=function(){
         return point.toStringSync();
      };
   }
   return Point;
})();
var Dimension=(function(){
   function Dimension(dim){
      this.getHeight=function(){
         return dim.getHeightSync();
      };
      this.getWidth=function(){
         return dim.getWidthSync();
      };
      this.toString=function(){
         return dim.toStringSync();
      };
   }
   return Dimension;
})();
var WebElement=(function(){
   function WebElement(el){
      this.clear=function(){
         el.clearSync();
      };
      this.click=function(){
         el.clickSync();
      };
      this.findElement=function(by){
         return new WebElement(el.findElementSync(by));
      };
      this.findElements=function(by){
         return findElements(el, by);
      };
      this.getAttribute=function(name){
         return el.getAttributeSync(name);
      };
      this.getCssValue=function(propertyName){
         return el.getCssValueSync(propertyName);
      };
      this.getLocation=function(){
         return new Point(el.getLocationSync());
      };
      this.getSize=function(){
         return new Dimension(el.getSizeSync());
      };
      this.getTagName=function(){
         return el.getTagNameSync();
      };
      this.getText=function(){
         return el.getTextSync();
      };
      this.isDisplayed=function(){
         return el.isDisplayedSync();
      };
      this.isEnabled=function(){
         return el.isEnabledSync();
      };
      this.isSelected=function(){
         return el.isSelectedSync();
      };
      this.sendKeys=function(){
         el.sendKeysSync(
            java.newArray(
               "java.lang.CharSequence",
               Array.prototype.slice.call(arguments)
            )
         );
      };
      this.submit=function(){
         el.submitSync();
      };
   }
   return WebElement;
})();
var By=(function(){
   function By(){
      this.className=function(name){
         return java.callStaticMethodSync(
            "org.openqa.selenium.By",
            "className",
            name
         );
      };
      this.cssSelector=function(selector){
         return java.callStaticMethodSync(
            "org.openqa.selenium.By",
            "cssSelector",
            selector
         );
      };
      this.id=function(id){
         return java.callStaticMethodSync(
            "org.openqa.selenium.By",
            "id",
            id
         );
      };
      this.linkText=function(linkText){
         return java.callStaticMethodSync(
            "org.openqa.selenium.By",
            "linkText",
            linkText
         );
      };
      this.name=function(name){
         return java.callStaticMethodSync(
            "org.openqa.selenium.By",
            "name",
            name
         );
      };
      this.partialLink=function(partialLink){
         return java.callStaticMethodSync(
            "org.openqa.selenium.By",
            "partialLink",
            partialLink
         );
      };
      this.tagName=function(tagName){
         return java.callStaticMethodSync(
            "org.openqa.selenium.By",
            "tagName",
            tagName
         );
      };
      this.xpath=function(xpath){
         return java.callStaticMethodSync(
            "org.openqa.selenium.By",
            "xpath",
            xpath
         );
      };
   }
   return By;
})();
var WebDriver=(function(){
   function WebDriver(){
      this.close=function(){
         this._driver.closeSync();
      };
      this.get=function(src){
         this._driver.getSync(src);
      };
      this.getCurrentUrl=function(){
         return this._driver.getCurrentUrlSync();
      };
      this.getPageSource=function(){
         return this._driver.getPageSourceSync();
      };
      this.getTitle=function(){
         return this._driver.getTitleSync();
      };
      this.getWindowHandle=function(){
         return this._driver.getWindowHandle();
      };
      this.findElement=function(by){
         return new WebElement(this._driver.findElementSync(by));
      };
      this.findElements=function(by){
         return findElements(this._driver, by);
      };
      this.getWindowHandles=function(){
         return collectionToArray(this._driver.getWindowHandlesSync());
      };
      this.manage=function(){
         return new WebDriverOptions(this._driver.manageSync());
      };
      this.navigate=function(){
         return new WebDriverNavigation(this._driver.navigateSync());
      };
      this.quit=function(){
         this._driver.quitSync();
      };
      this.switchTo=function(){
         return new WebDriverTargetLocator(this._driver.switchToSync());
      };
   }
   return WebDriver;
})();
var DecoratedDriver=(function(){
   function DecoratedDriver(driver){
      Object.defineProperty(this, '_driver', {
         get:function(){return driver;}
      });
   }
   extend(DecoratedDriver, WebDriver);
   return DecoratedDriver;
})();
var ChromeDriver=(function(){
   function ChromeDriver(){
      var driver = new ChromeDriverClass();
      Object.defineProperty(this, '_driver', {
         get:function(){return driver;}
      });
   }
   extend(ChromeDriver, WebDriver);
   return ChromeDriver;
})();
var FirefoxDriver=(function(){
   function FirefoxDriver(){
      var driver = new FirefoxDriverClass();
      Object.defineProperty(this, '_driver', {
         get:function(){return driver;}
      });
   }
   extend(FirefoxDriver, WebDriver);
   return FirefoxDriver;
})();

var HtmlUnitDriver=(function(){
   function HtmlUnitDriver(){
      var driver = new HtmlUnitDriverClass();
      Object.defineProperty(this, '_driver', {
         get:function(){return driver;}
      });
   }
   extend(HtmlUnitDriver, WebDriver);
   return HtmlUnitDriver;
})();
function extend(Child, Parent){
   Child.prototype=new Parent();
   Child.prototype.constructor=Child;
}
module.exports={
   ChromeDriver:ChromeDriver,
   FirefoxDriver:FirefoxDriver,
   HtmlUnitDriver:HtmlUnitDriver,
   By:new By(),
   Credentials:UserAndPassword
};
}();