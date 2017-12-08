from ..helpers.apple_map import AppleMap
from ..helpers.android_map import AndroidMap
from ..helpers.constants import Constants
from ..helpers.apple_helpers import writeIosPageSource
from ..helpers.ios_time import IosTime
from appium import webdriver
from appium.webdriver.common.touch_action import TouchAction
import time

class Home:
  def __init__(self, driver, device_type):
    assert isinstance(driver, webdriver.Remote)
    self.__driver = driver
    self.__device_type = device_type
    if device_type != Constants.ios and device_type != Constants.android:
      raise ValueError('Only [' + Constants.ios + '] and [' + Constants.android + '] are valid device types')
  
  def __click_date_button(self):
    if self.__device_type == Constants.ios:
      self.__driver.find_element_by_xpath('//*[starts-with(@label, "Start")]').click()

  def __click_length_button(self):
    if self.__device_type == Constants.ios:
      self.__driver.find_element_by_xpath('//*[starts-with(@label, "Length")]').click()

  def __click_ok(self):
    if self.__device_type == Constants.ios:
      self.__driver.find_element_by_xpath('//XCUIElementTypeButton[@name="OK"]').click()

  def select_a_random_meeting_time_in_the_future(self):
    if self.__device_type == Constants.ios:
      self.__click_date_button()
      ios_time = IosTime(self.__driver).sync_self_with_picker()
      arrow_instance = ios_time.get_time()
      new_time = arrow_instance.shift(hours=1).shift(minutes=15)
      ios_time.set_time(new_time).sync_picker_with_self()
      self.__click_ok()
      return new_time

  def select_meeting_length(self, length):
    valid_lengths = [15, 30, 45, 60]
    if length not in valid_lengths:
      raise ValueError('Only lengths of 15, 30, 45 and 60 are currently allowed, you provided: ', length)
    self.__click_length_button()
    wheel = self.__driver.find_element_by_class_name('XCUIElementTypePickerWheel')
    wheel.send_keys(str(length) + ' minutes')
    self.__click_ok()

  def bookit(self):
    if self.__device_type == Constants.ios:
      self.__driver.find_element_by_xpath('//XCUIElementTypeOther[@name="Bookit"]').click()

  def select_meeting_time(self, date):
    if self.__device_type == Constants.ios:
      return pick_ios_date(self.__driver)