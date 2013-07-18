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

//Classes imported from the classpath
var DateClass =
   java.import('java.util.Date');
var CookieClass =
   java.import('org.openqa.selenium.Cookie');
var WebDriverWaitClass =
   java.import('org.openqa.selenium.support.ui.WebDriverWait');
var HtmlUnitDriverClass =
   java.import('org.openqa.selenium.htmlunit.HtmlUnitDriver');
var ChromeDriverClass =
   java.import('org.openqa.selenium.chrome.ChromeDriver');
var FirefoxDriverClass=
   java.import('org.openqa.selenium.firefox.FirefoxDriver');


//helper methods
var findElements=function(base, by){
   return collectionToArray(base.findElementsSync(by), function(item){
      return new WebElement(item);
   });
};
var collectionToArray=function(collection, mapper){
   var iterator=collection.iteratorSync();
   var array=[];
   var _mapper=typeof mapper === 'function' ?
                        mapper :
                        function(item){return item;};
   while(iterator.hasNextSync()){
      array.push(
         _mapper(iterator.nextSync())
      );
   }
   return array;
};
function createDateClassFromSeconds(secs){
   return new DateClass(
      java.newInstanceSync("java.lang.Long", ""+((secs*1000)+(new Date()).getTime()))
   );
}
function assertIsWebElement(element){
   if(!(element instanceof WebElement)){
      throw new Error("element isn't an instance of WebElement.");
   }
   return element;
}
function assertIsWebDriver(driver){
   if(!(driver instanceof WebDriver)){
      throw new Error("driver isn't an instance of WebDriver.");
   }
   return driver;
}
function assertIsNumber(num){
   if(typeof num !== "number"){
      throw new Error("num isn't a number.");
   }
   return num;
}


//Begin Selenium API
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
var Cookie=(function(){
   function Cookie(
      name,
      value,
      pathOrDomain,
      secondsOrPath,
      seconds,
      isSecure
   ){
      var _name="";
      var _value="";
      var _domain=null;
      var _path="/";
      var _date=null;
      var _isSecure=false;

      var cookie;
      var numOfArgs = arguments.length > 6?6:arguments.length;

      if(numOfArgs>1){
         validateArgIsString(name, "name");
         validateArgIsString(value, "value");
         _name=name;
         _value=value;
         switch(numOfArgs){
         case 2:
            cookie = new CookieClass(_name, _value);
            break;
         case 3:
            validateArgIsString(pathOrDomain, "path");
            _path=pathOrDomain;
            cookie = new CookieClass(_name, _value, _path);
            break;
         case 4:
            validateArgIsString(pathOrDomain, "path");
            _path=pathOrDomain;
            _date=typeof secondsOrPath === 'number'?
                     createDateClassFromSeconds(secondsOrPath):
                     null;
            cookie = new CookieClass(_name, _value, _path, _date);
            break;
         case 5:
            validateArgIsString(pathOrDomain, "domain");
            validateArgIsString(secondsOrPath, "path");
            _domain=pathOrDomain;
            _path=secondsOrPath;
            _date=typeof seconds === 'number'?
                     createDateClassFromSeconds(seconds):
                     null;
            cookie=new CookieClass(_name, _value, _domain, _path, _date);
            break;
         case 6:
            validateArgIsString(pathOrDomain, "domain");
            validateArgIsString(secondsOrPath, "path");
            validateArgIsBoolean(isSecure, "isSecure");
            _domain=pathOrDomain;
            _path=secondsOrPath;
            _date=typeof seconds === 'number'?
                     createDateClassFromSeconds(seconds):
                     null;
            _isSecure=isSecure;
            cookie = new CookieClass(
               _name,
               _value,
               _domain,
               _path,
               _date?_date:null,
               _isSecure
            );
            break;
         }
      } else {
         if(!name){
            throw new Error("cookies require a name and a value at minimum.");
         } else {
            cookie = name;
            _name=cookie.getNameSync();
            _value=cookie.getValueSync();
            _domain=cookie.getDomainSync();
            _path=cookie.getPathSync();
            _date=cookie.getExpirySync()?
                     cookie.getExpirySync():
                     null;
            _isSecure=cookie.isSecureSync();
         }
      }

      this.getDomain=function(){
         return _domain;
      };
      this.getExpiry=function(){
         return _date?new Date(new Date(_date.getTimeSync()).toGMTString()):null;
      };
      this.getName=function(){
         return _name;
      };
      this.getPath=function(){
         return _path;
      };
      this.getValue=function(){
         return _value;
      };
      this.isSecure=function(){
         return _isSecure;
      };

      Object.defineProperty(this, '_cookie', {
         get:function(){return cookie;}
      });
   }
   function validateArgIsBoolean(value, arg){
      if(typeof value !== 'boolean'){
         throw new Error(arg+" must be a boolean.");
      }
   }
   function validateArgIsString(value, arg){
      if(typeof value !== 'string'){
         throw new Error(arg+" must be a string.");
      }
   }
   return Cookie;
})();
function ExpectedConditions(){
   this.alertIsPresent=function(){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "alertIsPresent"
      );
   };
   /**
    * An expectation for checking if the given element is selected.
    * @param {By|WebElement} arg
    */
   this.elementSelectionStateToBe=function(arg, isSelected){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "elementSelectionStateToBe",
         arg instanceof WebElement?
            arg._el:
            arg,
         isSelected
      );
   };
   /**
    * An expectation for checking an element is visible and enabled such that
    * you can click it.
    */
   this.elementToBeClickable=function(by){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "elementToBeClickable",
         by
      );
   };
   /**
    * An expectation for checking if the given element is selected.
    * @param {By|WebElement} arg
    */
   this.elementToBeSelected=function(arg){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "elementToBeSelected",
         arg instanceof WebElement?
            arg._el:
            arg
      );
   };
   /**
    * An expectation for checking whether the given frame is available to switch to.
    * @param {string} frameLocator
    */
   this.frameToBeAvailableAndSwitchToIt=function(frameLocator){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "frameToBeAvailableAndSwitchToIt",
         frameLocator
      );
   };
   /**
    * An expectation for checking that an element is either invisible or not
    * present on the DOM.
    */
   this.invisibilityOfElementLocated=function(by){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "invisibilityOfElementLocated",
         by
      );
   };

   /**
    * An expectation for checking that an element with text is either invisible
    * or not present on the DOM.
    * @param {By} by
    * @param {string} text
    */
   this.invisibilityOfElementWithText=function(by, text){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "invisibilityOfElementWithText",
         by,
         text
      );
   };
   /**
    * An expectation with the logical opposite condition of the given condition.
    * @param {ExpectedCondition} condition
    */
   this.not=function(condition){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "not",
         condition
      );
   };
   /**
    * An expectation for checking that there is at least one element present on
    * a web page.
    * @param {By} by
    */
   this.	presenceOfAllElementsLocatedBy=function(by){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "presenceOfAllElementsLocatedBy",
         by
      );
   };
   /**
    * An expectation for checking that an element is present on the DOM of a
    * page.
    * @param {By} by
    */
   this.presenceOfElementLocated=function(by){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "presenceOfElementLocated",
         by
      );
   };
   /**
    * Wrapper for a condition, which allows for elements to update by redrawing.
    * @param {ExpectedCondition} condition
    */
   this.refreshed=function(condition){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "refreshed",
         condition
      );
   };
   /**
    * Wait until an element is no longer attached to the DOM.
    * @param {WebElement} webElement
    */
   this.stalenessOf=function(webElement){
      assertIsWebElement(webElement);
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "stalenessOf",
         webElement._el
      );
   };
   /**
    * An expectation for checking if the given text is present in the specified
    * element.
    * @param {By} by
    * @param {string} text
    */
   this.textToBePresentInElement=function(by, text){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "textToBePresentInElement",
         by,
         text
      );
   };
   /**
    * An expectation for checking if the given text is present in the specified
    * elements value attribute.
    * @param {By} by
    * @param {string} text
    */
   this.textToBePresentInElementValue=function(by, text){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "textToBePresentInElementValue",
         by,
         text
      );
   };
   /**
    * An expectation for checking that the title contains a case-sensitive
    * substring.
    * @param {string} title
    */
   this.titleContains=function(title){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "titleContains",
         title
      );
   };
   /**
    * An expectation for checking the title of a page.
    * @param {string} title
    */
   this.titleIs=function(title){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "titleIs",
         title
      );
   };
   /**
    * An expectation for checking that an element, known to be present on the
    * DOM of a page, is visible.
    * @param {WebElement} webElement
    */
   this.visibilityOf=function(webElement){
      assertIsWebElement(webElement);
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "visibilityOf",
         webElement._el
      );
   };
   /**
    * An expectation for checking that an element is present on the DOM of a
    * page and visible.
    * @param {By} by
    */
   this.visibilityOfElementLocated=function(by){
      return java.callStaticMethodSync(
         "org.openqa.selenium.support.ui.ExpectedConditions",
         "visibilityOfElementLocated",
         by
      );
   };
}
var WebDriverOptions=(function(){
   function Options(options){
      this.addCookie=function(cookie){
         validateIsCookie(cookie);
         options.addCookieSync(cookie._cookie);
      };
      this.deleteAllCookies=function(){
         options.deleteAllCookiesSync();
      };
      this.deleteCookie=function(cookie){
         validateIsCookie(cookie);
         options.deleteCookieSync(cookie._cookie);
      };
      this.deleteCookieNamed=function(name){
         options.deleteCookieNamedSync(name);
      };
      this.getCookieNamed=function(name){
         var proposedCookie=options.getCookieNamedSync(name);
         if(proposedCookie){
            return new Cookie(proposedCookie);
         }
         return null;
      };
      this.getCookies=function(){
         return collectionToArray(options.getCookiesSync(),function(item){
            return new Cookie(item);
         });
      };
/**
WebDriver.ImeHandler	ime()
Logs	logs()
WebDriver.Timeouts	timeouts()
WebDriver.Window	window()
      */
   }
   return Options;
   function validateIsCookie(cookie){
      if(!(cookie instanceof Cookie)){
         throw new Error("cookie wasn't an instance of Cookie.");
      }
   }
})();
/**
 * @constructor
 * @param {WebDriver} driver
 * @param {number} timeout in seconds
 * @param {number} sleep in mills
 */
function WebDriverWait(driver, timeout, sleep){
   var wait;

   assertIsWebDriver(driver);
   assertIsNumber(timeout);
   if(sleep){
      assertIsNumber(sleep);
   }


   switch(arguments.length){
   case 2:
      wait=new WebDriverWaitClass(
         driver._driver,
         java.newInstanceSync("java.lang.Long", timeout)
      );
      break;
   case 3:
      wait=new WebDriverWaitClass(
         driver._driver,
         java.newInstanceSync("java.lang.Long", timeout),
         java.newInstanceSync("java.lang.Long", sleep)
      );
      break;
   }

   /**
    * Repeatedly applies this instance's input value to the given function until
    * one of the following occurs: the function returns neither null nor false,
    * the function throws an unignored exception, the timeout expires, the
    * current thread is interrupted.
    *
    * @param {ExpectedCondition} isTrue
    */
   this.until=function(isTrue){
      return wait.untilSync(isTrue);
   };
   /**
    * Sets the message to be displayed when time expires.
    * @param {string} message
    */
   this.withMessage=function(message){
      return wait.withMessageSync(message);
   };
}
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
      Object.defineProperty(this, "_el", {
         get:function(){return el;}
      });
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
   ExpectedConditions:new ExpectedConditions(),
   WebDriverWait:WebDriverWait,
   Credentials:UserAndPassword,
   Cookie:Cookie
};
}();