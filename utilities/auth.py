from twitter import Twitter, OAuth, TwitterHTTPError

OAUTH_TOKEN = '2905474573-dYtaXGbf6g3ChENMR9gpSeDKXzMP5wPsCvsaJqH'
OAUTH_SECRET = 'FGzC9Zpz9cXmn0XNTsrLffDMup5CesRWd4XJL0eTrsleS'
CONSUMER_KEY = 'l9RI4nySQUGm7ELBmyN0ptCDn'
CONSUMER_SECRET = 'C8wPiDXEzczG7b52VlwHblB0475Fkq9blGSUreSvZ0oWy0DLOY'
TWITTER_HANDLE = 'tweetlejuiceapp'

t = Twitter(auth=OAuth(OAUTH_TOKEN, OAUTH_SECRET,
    CONSUMER_KEY, CONSUMER_SECRET))