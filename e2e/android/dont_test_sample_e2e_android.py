import unittest
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class TestSampleE2eAndroid(unittest.TestCase):

  def setup_class(self):
    desired_caps = {}
    desired_caps['platformName'] = 'Android'
    desired_caps['platformVersion'] = '8.1'
    desired_caps['deviceName'] = 'Android Emulator'
    desired_caps['app'] = 'https://s3.amazonaws.com/bookit-mobile-artifacts/integration.apk'

    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    # wait for bookit button to appear
    WebDriverWait(self.driver, 15).until(EC.presence_of_element_located((By.XPATH, '//android.widget.TextView[@text="Bookit"]')))
  
  def teardown_class(self):
    self.driver.quit()

  def test_opens_app_js(self):
    first_text_box_text = self.driver.find_element_by_xpath('(//android.widget.TextView)[1]')
    self.assertIn('room in NYC at', first_text_box_text.text)