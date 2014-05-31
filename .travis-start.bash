#!/bin/bash

TRAVIS=true

export DISPLAY=:99.0

#Xvfb :99 -screen 0 1920x1200 > /dev/null 2>&1 &
Xvfb :99  -ac  -screen 0 1280x1024x24 &

xvfbPid=$!
echo $xvfbPid

WEBDRIVER_SYNC_ENABLE_SELENIUM_STDOUT=true
WEBDRIVER_SYNC_ENABLE_SELENIUM_STDERR=true

npm test

kill $xvfbPid
