                                                                                                                                                                       # -*- coding: utf-8 -*-
"""
Copyright 2014 Randal S. Olson

This file is part of the Twitter Follow Bot library.

The Twitter Follow Bot library is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License as published by the
Free Software Foundation, either version 3 of the License, or (at your option) any
later version.

The Twitter Follow Bot library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with the Twitter
Follow Bot library. If not, see http://www.gnu.org/licenses/.
"""

from sets import Set
import time
from dateutil.parser import parse as parse_date
import datetime
from twitter import Twitter, OAuth, TwitterHTTPError
from django.http import HttpResponse
from django.conf import settings
import json, simplejson



#OAUTH_TOKEN = '2905474573-dYtaXGbf6g3ChENMR9gpSeDKXzMP5wPsCvsaJqH'
#OAUTH_SECRET = 'FGzC9Zpz9cXmn0XNTsrLffDMup5CesRWd4XJL0eTrsleS'


food_hashtags = ['food','foodporn', 'foodie', 'foodgasm', 'nom', 'nomnomnom', 'foodpicsbruh', 'foodbaby', 'yummy', 'hungry', 'delicious', 'cooking', 'instafood', 'recipes', 'pizza', 'dinner', 'yum', 'beer', 'pasta', 'dessert', 'foods', 'desserts', 'chocolate', 'fooddiary', 'feast', 'feastday', 'churros', 'cookies', 'doughnuts', 'sweettooth' ,'icecream', 'sweet' , 'breakfast', 'lunch' ,'chocaholic', 'strawberries' ,'organic', 'fries', 'burgers', 'foodcoma', 'snack', 'vegetarian', 'wine', 'ipa' 'draft', 'beergasm', 'beeroftheday', 'mmmbeer', 'craftbeerporn', 'brewery', 'lowbrau', 'homebrew', 'beerchat', 'drunk', 'nowdrinking', 'craftbeer', 'sacbeer']

clothes_hashtags = ['bowtie', 'bow tie', 'pocket square', 'dapper', 'style', 'shoes', 'watch', 'suit', 'tie', 'ootd', 'fashion', 'ootd', 'mensfashion', 'sneakers', 'shoes', 'selfie', 'beautiful', 'cute', 'chanel', 'travel']

niners_hashtags = ['Niners', 'NFL', 'QuestForSix', 'NinerNation', '49ers', 'NinerGang', 'football', 'kaepernick', 'crabtree', 'aldon smith', 'frank gore', 'vernon davis']

niners_hashtags2 = ['#Niners', '#NFL', '#QuestForSix', '#NinerNation', '#49ers', '#NinerGang']

lat_long = {
				'SF': '37.787711,-122.406610',
				'1WESTSTREET' : '40.705349,-74.016063',
				'SAC': '38.581572,-121.4944',
				'NYC': '40.756567,-73.985410',
				'Red Rabbit': '38.581572, -121.494400'
		   }




def geo_search_tweets(t, q, city, radius):
    """
        Returns a list of tweets matching a certain phrase and location
    """

    return t.search.tweets(q=q, geocode='%s,%dkm' % (lat_long[city], radius), result_type='recent', count=100)


def get_local_tweets(hashtags, city, radius):


	already_added = []
	num_tweeters = 0

	oldest_tweet = None
	oldest_tweet_date = datetime.datetime.now()
	newest_tweet_date = datetime.datetime.now() - datetime.timedelta(weeks=50)


	for q in hashtags:

		result = geo_search_tweets(q=q, city=city, radius=radius)

		tweeters = Set()

		for tweet in result['statuses']:

			tweet_date = parse_date(tweet['created_at']).replace(tzinfo=None) #Remove timezone info

			if tweet_date < oldest_tweet_date:
				oldest_tweet_date = tweet_date
				oldest_tweet = tweet

			if tweet_date > newest_tweet_date:
				newest_tweet_date = tweet_date
				newest_tweet = tweet

			if tweet['user']['screen_name'] not in already_added:
				tweeters.add(tweet['user']['screen_name'])
				already_added.append(tweet['user']['screen_name'])

		num_tweeters += len(tweeters)

		print("%s has %d Tweets! " % (q, len(tweeters)))
		print tweeters

		print("\n\n")


	print("There are %d food tweeters!" % (num_tweeters))

	print("oldest tweet date %s oldest tweet %s " % (oldest_tweet_date, oldest_tweet))
	print("\n\n")
	print("oldest tweet date %s oldest tweet %s " % (newest_tweet_date, newest_tweet))



def json_local_tweets(request):


	hashtags = food_hashtags
	city = request.GET.get('city', '')
	radius = int(request.GET.get('radius', ''))

	print("JSON LOCAL TWEETS: %s %s" % (request.session['OAUTH_TOKEN'], request.session['OAUTH_TOKEN_SECRET']))

	already_added = []

	json_tweets = []

	print("before init")
	t = Twitter(auth=OAuth(request.session['OAUTH_TOKEN'], request.session['OAUTH_TOKEN_SECRET'], settings.CONSUMER_KEY, settings.CONSUMER_SECRET))
	print("twitter:")
	print t

	for q in hashtags:

		result = geo_search_tweets(t=t, q=q, city=city, radius=radius)


		for tweet in result['statuses']:

			if tweet['user']['screen_name'] not in already_added:

				tweet_time_stamp = datetime.datetime.strptime(tweet['created_at'],'%a %b %d %H:%M:%S +0000 %Y')

				now = datetime.datetime.now()

				diff = now - tweet_time_stamp

				time_since_tweet = None

				days_since_tweet = diff.total_seconds() / 60.0 / 60 / 24


				#If we can't have days > 1, then convert to hours for readability!
				if days_since_tweet >= 1:
					time_since_tweet = str(int(days_since_tweet)) + 'd ago '
				else:
					time_since_tweet = str(int(days_since_tweet * 24)) + 'h ago '


				json_tweet = {
								'screen_name' : tweet['user']['screen_name'],
								'tweet_text'  : tweet['text'],
								'profile_image_url' : tweet['user']['profile_image_url'], 
								'latitude'			: tweet['coordinates']['coordinates'][1],
								'longitude'			: tweet['coordinates']['coordinates'][0],
								'time_since_tweet'  : time_since_tweet

							 }

				json_tweets.append(json_tweet)
						 
				already_added.append(tweet['user']['screen_name'])

	return HttpResponse(json.dumps(json_tweets), content_type="application/json")








