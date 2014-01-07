#!/bin/bash
set -e
SCRIPT_DIR=$(dirname $(readlink -f ${BASH_SOURCE[0]}))
PROJECT_DIR=$(dirname $SCRIPT_DIR)

#Perform a sanity check on the published module to verify that it works.
tmpDir=/tmp/webdriver-sync
tmpNodeModuleDir=$tmpDir/node_modules
testFile=$tmpDir/test.js

rm -rf $HOME/.webdriver-sync

rm -rf $tmpDir 2> /dev/null

mkdir -p $tmpNodeModuleDir

ln -s $PROJECT_DIR $tmpNodeModuleDir/webdriver-sync

cd $tmpDir

npm install webdriver-sync

cat > $testFile <<~
var wd = require('webdriver-sync');
var driver = new wd.ChromeDriver();

driver.get('http://google.com');
setTimeout(function(){driver.quit();}, 1000);
~

node $testFile