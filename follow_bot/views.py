from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from twython import Twython
from twitter import Twitter, OAuth, TwitterHTTPError
import twitter, json, simplejson

def bot_dashboard(request):

	return render_to_response("common/follow_bot/follow_dashboard.html")

def twitter_analytics(request):

	return render_to_response("common/follow_bot/twitter_analytics.html")