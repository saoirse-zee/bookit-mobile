import unittest
import time
import json
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class TestSampleE2eAndroid(unittest.TestCase):

  def setup_class(self):
    with open('../config.json') as data_file:    
      data = json.load(data_file)

    desired_caps = {}
    desired_caps['platformName'] = 'Android'
    desired_caps['platformVersion'] = '8.1'
    desired_caps['deviceName'] = 'Android Emulator'
    desired_caps['noReset'] = True
    desired_caps['timeout'] = 90000
    desired_caps['app'] = 'https://s3.amazonaws.com/bookit-mobile-artifacts/local-testing.apk'
    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

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
    self.driver.find_element_by_xpath('//android.widget.TextView[@text="Home"]').click()
  
  def teardown_class(self):
    self.driver.quit()

  def test_forces_the_user_to_login(self):
    first_text_box_text = self.driver.find_element_by_xpath('(//android.widget.TextView[not(@content-desc="nonce")])[1]')
    self.assertIn('You need to log in to see the home screen.', first_text_box_text.text)