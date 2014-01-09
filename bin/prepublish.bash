#!/bin/bash
set -e
if [ -n "$ISSACS_HACK_FOR_PREPUBLISH" ];then
  exit
fi

export ISSACS_HACK_FOR_PREPUBLISH="foo"

echo 'CALLING prepublish.bash'
SCRIPT_DIR=$(dirname $(readlink -f ${BASH_SOURCE[0]}))
PROJECT_DIR=$(dirname $SCRIPT_DIR)

#Perform a sanity check on the published module to verify that it works.
tmpDir=/tmp/webdriver-sync
tmpWdDir=$tmpDir/node_modules/webdriver-sync
testFile=$tmpDir/test.js

rm -rf $HOME/.webdriver-sync

rm -rf $tmpDir 2> /dev/null

mkdir -p $tmpWdDir

cp -r $PROJECT_DIR/* $tmpWdDir

cd $tmpWdDir

echo 'running npm install'

rm -rf ./node_modules

npm install --production

cd $tmpDir

cat > $testFile <<~
var wd = require('webdriver-sync');
var driver;
var el;

wd.exportTo(global);
driver = new ChromeDriver();

driver.get('http://google.com');
el = driver.findElement(By.name('q'));
el.sendKeys('asdfasdf', Keys.SPACE);
el.submit();
setTimeout(function(){driver.quit();}, 1000);
~

node $testFile