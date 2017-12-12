from pages import navigation, account, home, bookings
from modals import error_modal, booking_success_modal
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
    self.home = home.Home(self.__driver, self.__device_type)
    self.bookings = bookings.Bookings(self.__driver, self.__device_type)
    self.error_modal = error_modal.ErrorModal(self.__driver, self.__device_type)
    self.booking_success_modal = booking_success_modal.BookingSuccessModal(self.__driver, self.__device_type)