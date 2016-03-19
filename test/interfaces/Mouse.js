'use strict';

describe('Mouse', function()
{
  var assert = require('assert');
  var driverHelper = require('../lib/driver.js');
  var driver = driverHelper.driver;
  var Keys = require('../../src/enums/Keys');
  var mouse;

  beforeEach(function()
  {
		try
		{
			driver.switchTo().alert().accept();
		}
		catch (e)
		{

		}
		driver.get('http://google.com');
		mouse = driver.getMouse();
  });

  after(function()
  {
    driver.quit();
  });

  it('should perform click by coordinates',
		getMouseActionTestFunction('click', function(coords)
		{
			mouse.click(coords);
		}));

  it('should perform context click by coordinates',
		getMouseActionTestFunction('contextmenu', function(coords)
		{
			mouse.contextClick(coords);
		}));

  it('should perform double click by coordinates',
		getMouseActionTestFunction('dblclick', function(coords)
		{
			mouse.doubleClick(coords);
		}));

  it('should perform mouse down by coordinates',
		getMouseActionTestFunction('mousedown', function(coords)
		{
			mouse.mouseDown(coords);
		}));

  it('should perform mouse up by coordinates',
		getMouseActionTestFunction('mouseup', function(coords)
		{
			mouse.mouseUp(coords);
		}));

  it('should perform mouse move by coordinates',
  getMouseActionTestFunction('mousemove', function(coords)
  {
		mouse.mouseMove(coords, 5, 10);
  }));

  function getMouseActionTestFunction(domEventName, actionPerformFunction)
  {
		return function()
		{
			driver.executeScript('document.getElementsByName("q")[0]' +
				'.addEventListener("' +  domEventName + '", ' +
					'function(){ alert("' + domEventName + '")})');
			actionPerformFunction(driver.findElementByName('q').getCoordinates());

			assert(driver.switchTo().alert().getText() === domEventName);
		};
  }
});