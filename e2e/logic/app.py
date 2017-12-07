from pages import navigation, account
from helpers.constants import Constants

class App:
  def __init__(self, driver, device_type):
    self.__driver = driver
    self.__device_type = device_type
    if device_type is not Constants.ios and device_type is not Constants.android:
      raise ValueError('Only "' + Constants.ios + '" and "' + Constants.android + '" are valid device types, you provided: ' + device_type)
    self.__assignPages()

  def __assignPages(self):
    self.navigation = navigation.Navigation(self.__driver, self.__device_type)
    self.account = account.Account(self.__driver, self.__device_type)