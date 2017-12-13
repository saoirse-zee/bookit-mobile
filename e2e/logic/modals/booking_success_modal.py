from ..helpers.constants import Constants
from ..helpers.booking import Booking
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from appium import webdriver

class BookingSuccessModal:
  def __init__(self, driver, device_type):
    assert isinstance(driver, webdriver.Remote)
    self.__driver = driver
    self.__device_type = device_type
    if device_type != Constants.ios and device_type != Constants.android:
      raise ValueError('Only [' + Constants.ios + '] and [' + Constants.android + '] are valid device types')

  def is_open(self):
    if self.__device_type == Constants.ios:
      self.wait_for_modal()
      title = self.__driver.find_elements_by_xpath('//XCUIElementTypeStaticText[@name="You booked it!"]')
      return len(title) == 1

  def get_booking(self):
    status_message = self.__driver.find_element_by_xpath('//XCUIElementTypeOther[@name="status message"]//XCUIElementTypeStaticText').text
    return Booking().parse_booking_success_modal(status_message)

  def dismiss(self):
    if self.__device_type == Constants.ios:
      self.__driver.find_element_by_xpath('//XCUIElementTypeOther[@name="Okay"]').click()

  def wait_for_modal(self):
    if self.__device_type == Constants.ios:
      WebDriverWait(self.__driver, 5).until(EC.presence_of_element_located((By.XPATH, '//XCUIElementTypeStaticText[@name="You booked it!"]')))
