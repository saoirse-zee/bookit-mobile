import re
import arrow

date_parsing_string = 'MMMM D, YYYY, h:mm A ZZZ'
class Booking:
  def __str__(self):
    printed = {}
    printed['room'] = self.room
    printed['location'] = self.location
    printed['start'] = self.start
    printed['end'] = self.end
    return str(printed)

  def __eq__(self, other):
    assert isinstance(other, Booking)
    return \
      self.room == other.room and \
      self.location == other.location and \
      self.start == other.start and \
      self.end == other.end

  def __ne__(self, other):
    assert isinstance(other, Booking)
    return \
      self.room != other.room or \
      self.location != other.location or \
      self.start != other.start or \
      self.end != other.end
  
  def parse_booking_success_modal(self, text):
    assert isinstance(text, basestring)
    self.room = re.search(r'\w+ Room', text).group(0).replace(' Room', '')
    self.location = re.search(r'in \w+ from', text).group(0).replace('in ', '').replace(' from', '')
    start = re.search(r'from [\s\S]* until', text).group(0).replace('from ', '').replace(' until', '')
    self.start = arrow.get(start, date_parsing_string)
    end = re.search(r'until [\s\S]*', text).group(0).replace('until ', '')
    self.end = arrow.get(end, date_parsing_string)
    return self

  def parse_booking_page_booking(self, text):
    # Green Room in NYC Start: December 12, 2017, 2:02 PM EST End: December 12, 2017, 2:32 PM EST Booked by: Fake DB User
    assert isinstance(text, basestring)
    self.room = re.search(r'\w+ Room', text).group(0).replace(' Room', '')
    self.location = re.search(r'in \w+ Start', text).group(0).replace('in ', '').replace(' Start', '')
    start = re.search(r'Start: [\s\S]* End', text).group(0).replace('Start: ', '').replace(' End', '')
    self.start = arrow.get(start, date_parsing_string)
    end = re.search(r'End: [\s\S]* Booked by', text).group(0).replace('End: ', '').replace(' Booked by', '')
    self.end = arrow.get(end, date_parsing_string)
    return self

