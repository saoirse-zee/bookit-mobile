import unittest
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class TestSampleAndroid(unittest.TestCase):

  def setup_class(self):
    desired_caps = {}
    desired_caps['platformName'] = 'Android'
    desired_caps['platformVersion'] = '8.1'
    desired_caps['deviceName'] = 'Android Emulator'
    desired_caps['app'] = 'https://exp-shell-app-assets.s3-us-west-1.amazonaws.com/android%2F%40benaychh%2Fbookit-prototype-3-integration-c38d07b5-ce25-11e7-92e9-0a580a782107-signed.apk'

    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    WebDriverWait(self.driver, 5).until(EC.presence_of_element_located((By.XPATH, '//android.widget.TextView')))
  
  def teardown_class(self):
    self.driver.quit()

  def test_opens_app_js(self):
    print(self.driver.page_source)
    first_text_box_text = self.driver.find_element_by_xpath('//android.widget.TextView[@index="0"]')
    self.assertIn('wrong', first_text_box_text.text)