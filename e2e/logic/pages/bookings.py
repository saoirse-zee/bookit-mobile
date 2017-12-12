from ..helpers.constants import Constants
from ..helpers.apple_helpers import writeIosPageSource
from ..helpers.booking import Booking
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
import arrow

class Bookings:
  def __init__(self, driver, device_type):
    assert isinstance(driver, webdriver.Remote)
    self.__driver = driver
    self.__device_type = device_type
    if device_type != Constants.ios and device_type != Constants.android:
      raise ValueError('Only [' + Constants.ios + '] and [' + Constants.android + '] are valid device types')

  def getListOfBookings(self):
    booking_elements = self.__driver.find_elements_by_xpath('//XCUIElementTypeOther[@name="List Of Bookings"]/XCUIElementTypeOther')
    booking_texts = list(map(lambda e: e.text, booking_elements))
    return list(map(lambda text: Booking().parse_booking_page_booking(text), booking_texts))
    

  