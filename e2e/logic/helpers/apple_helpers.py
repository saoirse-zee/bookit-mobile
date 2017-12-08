# -*- coding: utf-8 -*-
from appium import webdriver
from ios_time import IosTime

def writeIosPageSource(driver):
  assert isinstance(driver, webdriver.Remote)
  f = open('ios-pagesource.xml','w')
  f.write(driver.page_source.encode('utf8'))
  f.close()