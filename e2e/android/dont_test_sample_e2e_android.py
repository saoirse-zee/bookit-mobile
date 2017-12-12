import unittest
import time
import json
import pytest
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from ..logic.app import App
from desired_caps import desired_caps

class TestSampleE2eAndroid(unittest.TestCase):

  def setup_class(self):
    with open('../config.json') as data_file:    
      data = json.load(data_file)

    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)
    self.app = App(self.driver, desired_caps['platformName'])

    # Make sure that the android app has the new code
    WebDriverWait(self.driver, 15).until(EC.presence_of_element_located((By.XPATH, '//android.widget.TextView[@text="?"]')))
    self.driver.find_element_by_xpath('//android.widget.TextView[@text="?"]').click()
    nonce = self.driver.find_element_by_xpath('//android.widget.TextView[@content-desc="nonce"]')
    count = 0
    while (nonce.text != data["nonce"] and count < 10):
      print('looping')
      time.sleep(45)
      self.driver.close_app()
      self.driver.launch_app()
      WebDriverWait(self.driver, 15).until(EC.presence_of_element_located((By.XPATH, '//android.widget.TextView[@text="?"]')))
      self.driver.find_element_by_xpath('//android.widget.TextView[@text="?"]').click()
      nonce = self.driver.find_element_by_xpath('//android.widget.TextView[@content-desc="nonce"]')
      count = count + 1
    self.app.navigation.goToHome()
  
  # def teardown_class(self):
  #   self.driver.quit()

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