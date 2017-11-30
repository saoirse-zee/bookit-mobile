import unittest
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class TestSampleIPhone(unittest.TestCase):

  def setup_class(self):
    desired_caps = {}
    desired_caps['platformName'] = 'iOS'
    desired_caps['platformVersion'] = '11.1'
    desired_caps['deviceName'] = 'iPhone 7'
    desired_caps['app'] = 'https://s3.amazonaws.com/bookit-mobile-artifacts/ios-integration.zip'

    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    # wait for bookit button to appear
    WebDriverWait(self.driver, 5).until(EC.presence_of_element_located((By.XPATH, '//XCUIElementTypeOther[@label="Bookit"]')))
  
  def teardown_class(self):
    self.driver.quit()

  def test_opens_app_js(self):
    first_text_box_text = self.driver.find_element_by_xpath('(//XCUIElementTypeStaticText)[1]')
    self.assertIn('room in NYC at', first_text_box_text.text)