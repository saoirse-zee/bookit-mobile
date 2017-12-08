# -*- coding: utf-8 -*-

import unittest, time, pytest, sys, os
import time
import pytest
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from ..logic.app import App

class TestSampleE2eIos(unittest.TestCase):

  def setup_class(self):
    desired_caps = {}
    desired_caps['platformName'] = 'iOS'
    desired_caps['platformVersion'] = '11.1'
    desired_caps['deviceName'] = 'iPhone 7'
    desired_caps['app'] = 'https://s3.amazonaws.com/bookit-mobile-artifacts/local-testing.ipa'

    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)
    self.app = App(self.driver, desired_caps['platformName'])

    # Wait for the home button to appear - means app has loaded
    WebDriverWait(self.driver, 5).until(EC.presence_of_element_located((By.XPATH, '//XCUIElementTypeOther[contains(@name, "Home")]')))
  
  # def teardown_class(self):
    # self.driver.quit()

  def test_01_logs_the_user_in(self):
    self.app.navigation.go_to_me()
    self.app.account.login_hero()
    assert self.app.account.is_logged_in()
  
  def test_02_can_book_a_room(self):
    self.app.navigation.go_to_home()
    self.booked_meeting_time = self.app.home.select_a_random_meeting_time_in_the_future()
    self.app.home.select_meeting_length(45)
    self.app.home.bookit()
    assert self.app.error_modal.is_open()
    self.app.error_modal.dimiss()


  # @pytest.mark.run(after='test_logs_the_user_in')
  # def test_logs_the_user_out(self):
  #   self.app.account.logout()
  #   assert(self.app.account.isLoggedIn()) is False
