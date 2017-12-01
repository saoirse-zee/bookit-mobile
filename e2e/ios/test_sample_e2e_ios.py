import unittest
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time

class TestSampleE2eIos(unittest.TestCase):

  def setup_class(self):
    desired_caps = {}
    desired_caps['platformName'] = 'iOS'
    desired_caps['platformVersion'] = '11.1'
    desired_caps['deviceName'] = 'iPhone 7'
    desired_caps['app'] = 'https://s3.amazonaws.com/bookit-mobile-artifacts/local-testing.ipa'

    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    # Wait for the home button to appear - means app has loaded
    WebDriverWait(self.driver, 5).until(EC.presence_of_element_located((By.XPATH, '//XCUIElementTypeOther[contains(@name, "Home")]')))
  
  def teardown_class(self):
    self.driver.quit()

  def dont_test_forces_the_user_to_login(self):
    first_text_box_text = self.driver.find_element_by_xpath('(//XCUIElementTypeStaticText)[1]')
    self.assertIn('You need to log in', first_text_box_text.text)