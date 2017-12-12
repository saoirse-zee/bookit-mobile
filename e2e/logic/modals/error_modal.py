from ..helpers.constants import Constants
from appium import webdriver

class ErrorModal:
  def __init__(self, driver, device_type):
    assert isinstance(driver, webdriver.Remote)
    self.__driver = driver
    self.__device_type = device_type
    if device_type != Constants.ios and device_type != Constants.android:
      raise ValueError('Only [' + Constants.ios + '] and [' + Constants.android + '] are valid device types')

  def is_open(self):
    if self.__device_type == Constants.ios:
      title = self.__driver.find_elements_by_xpath('//XCUIElementTypeStaticText[@name="There was an error :("]')
      return len(title) == 1

  def dismiss(self):
    if self.__device_type == Constants.ios:
      self.__driver.find_element_by_xpath('//XCUIElementTypeOther[@name="Okay"]').click()