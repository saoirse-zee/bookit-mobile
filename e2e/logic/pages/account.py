from ..helpers.apple_map import AppleMap
from ..helpers.android_map import AndroidMap
from ..helpers.constants import Constants
from appium import webdriver

class Account:
  def __init__(self, driver, device_type):
    assert isinstance(driver, webdriver.Remote)
    self.__driver = driver
    self.__device_type = device_type
    if device_type is not Constants.ios and device_type is not Constants.android:
      raise ValueError('Only "' + Constants.ios + '" and "' + Constants.android + '" are valid device types')

  def loginHero(self):
    if self.__device_type == Constants.ios:
      return self.__driver.find_element_by_id('hero_login').click()
    elif self.__device_type == Constants.android:
      return self.__driver.find_element_by_xpath('//' + AndroidMap.text + '[@text="LOG IN AS A HERO"]').click()

  def isLoggedIn(self):
    if self.__device_type == Constants.ios:
      return len(self.__driver.find_elements_by_name('Log out')) is not 0
    elif self.__device_type == Constants.android:
      return len(self.__driver.find_elements_by_xpath('//' + AndroidMap.text + '[@text="LOG OUT"]')) is not 0

  def logout(self):
    if self.__device_type == Constants.ios:
      return self.__driver.find_element_by_name('Log out').click()
    elif self.__device_type == Constants.android:
      return self.__driver.find_element_by_xpath('//' + AndroidMap.text + '[@text="LOG OUT"]').click()
