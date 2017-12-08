from appium import webdriver
import arrow

ios_date_in_timepicker_format = 'ddd, MMM D'

class IosTime:
  __time = arrow.now()

  def __init__(self, driver):
    self.__driver = driver

  def get_time(self):
    return self.__time

  def set_time(self, time):
    assert isinstance(time, arrow.Arrow)
    self.__time = time
    return self

  def sync_self_with_picker(self):
    wheels = self.__driver.find_elements_by_class_name("XCUIElementTypePickerWheel")
    assert len(wheels) == 4
    now = arrow.now()
    date = str(wheels[0].get_attribute('value'))
    if (date == 'Today'):
      date = now.format(ios_date_in_timepicker_format)
    hour = str(wheels[1].get_attribute('value').split()[0])
    minute = str(wheels[2].get_attribute('value').split()[0])
    period = str(wheels[3].get_attribute('value'))
    self.__time = arrow.get(str(now.year) + ' ' + date + ' ' + hour + ' ' + minute + ' ' + period, 'YYYY ' + ios_date_in_timepicker_format + ' h mm A')
    return self

  def sync_picker_with_self(self):
    wheels = self.__driver.find_elements_by_class_name("XCUIElementTypePickerWheel")
    assert len(wheels) == 4
    now = arrow.now()
    if now.format(ios_date_in_timepicker_format) == self.__time.format(ios_date_in_timepicker_format):
      wheels[0].send_keys('Today')
    else:
      wheels[0].send_keys(self.__time.format(ios_date_in_timepicker_format))
    wheels[1].send_keys(self.__time.format('h'))
    wheels[2].send_keys(self.__time.format('mm'))
    wheels[3].send_keys(self.__time.format('A'))
    return self
