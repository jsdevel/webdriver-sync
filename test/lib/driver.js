/*!
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var path = require('path');
var webdriver = require(
  path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
);
var DesiredCapabilities = webdriver.DesiredCapabilities;
var RemoteWebDriver = webdriver.RemoteWebDriver;
var service = webdriver.ChromeDriverService.createDefaultService();
service.start();

module.exports = {
  get driver() {
    return new RemoteWebDriver(service.getUrl(), DesiredCapabilities.chrome());
  }
};