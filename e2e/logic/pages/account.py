from ..helpers.apple_map import AppleMap
from ..helpers.android_map import AndroidMap
from ..helpers.constants import Constants
from appium import webdriver

class Account:
  def __init__(self, driver, device_type):
    assert isinstance(driver, webdriver.Remote)
    self.__driver = driver
    self.__device_type = device_type
    if device_type == Constants.ios:
      self.__device_map = AppleMap()
    elif device_type == Constants.android:
      self.__device_map = AndroidMap()
    else:
      raise ValueError('Only "' + Constants.ios + '" and "' + Constants.android + '" are valid device types')

  def loginHero(self):
    if self.__device_type == Constants.ios:
      return self.__driver.find_element_by_id('hero_login').click()
    elif self.__device_type == Constants.android:
      return self.__driver.find_element_by_accessibility_id('hero login').click()

  def isLoggedIn(self):
    if self.__d