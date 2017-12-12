    desired_caps = {}
    desired_caps['platformName'] = 'Android'
    desired_caps['platformVersion'] = '8.1'
    desired_caps['deviceName'] = 'Android Emulator'
    desired_caps['noReset'] = True
    desired_caps['timeout'] = 90000
    desired_caps['app'] = 'https://s3.amazonaws.com/bookit-mobile-artifacts/local-testing.apk'