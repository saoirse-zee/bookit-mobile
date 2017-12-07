# -*- coding: utf-8 -*-

from ..helpers.apple_map import AppleMap
from ..helpers.android_map import AndroidMap
from ..helpers.constants import Constants
from appium import webdriver

ios_home_text = "  Home"
ios_booking_text = "  Bookings"
ios_account_text = "  Me"

android_home_text = ""
android_booking_text = ""
android_account_text = "?"

class Navigation:
  def __init__(self, driver, device_type):
    assert isinstance(driver, webdriver.Remote)
    self.__driver = driver
    self.__device_type = device_type
    if device_type is not Constants.ios and device_type is not Constants.android:
      raise ValueError('Only "' + Constants.ios + '" and "' + Constants.android + '" are valid device types')

  def goToHome(self):
    if self.__device_type is Constants.ios:
      return self.__driver.find_element_by_name(ios_home_text).click()
    elif self.__device_type is Constants.android:
      return self.__driver.find_element_by_xpath('//' + AndroidMap.text + '[@text="' + android_home_text + '"]').click()

  def goToBookings(self):
    if self.__device_type is Constants.ios:
      return self.__driver.find_element_by_name(ios_booking_text).click()
    elif self.__device_type is Constants.android:
      return self.__driver.find_element_by_xpath('//' + AndroidMap.text + '[@text="' + android_booking_text + '"]').click()

  def goToMe(self):
    if self.__device_type is Constants.ios:
      return self.__driver.find_element_by_name(ios_account_text).click()
    elif self.__device_type is Constants.android:
      return self.__driver.find_element_by_xpath('//' + AndroidMap.text + '[@text="' + android_account_text + '"]').click()