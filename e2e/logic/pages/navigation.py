from ..helpers.apple_map import AppleMap
from ..helpers.android_map import AndroidMap
from ..helpers.constants import Constants
from appium import webdriver

home_text = "Home"
booking_text = "Bookings"
account_text = "Me"

class Navigation:
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

  def goToHome(self):
    self.__driver.find_element_by_xpath('//' + self.__device_map.text + '[contains(@label, "' + home_text + '")]')

  def goToBookings(self):
    self.__driver.find_element_by_xpath('//' + self.__device_map.text + '[contains(@label, "' + booking_text + '")]')

  def goToMe(self):
    print('//' + self.__device_map.text + '[contains(@label, "' + account_text + '")]')
    self.__driver.find_element_by_xpath('//' + self.__device_map.text + '[contains(@label, "' + account_text + '")]')