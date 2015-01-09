from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'solomo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'helloworld.views.home', name='home'),
    url(r'^login/$', 'helloworld.views.login', name='login'),
    url(r'^follow_bot/$', 'follow_bot.views.bot_dashboard', name='bot_dashboard'),
    url(r'^twitter_analytics/$', 'follow_bot.views.twitter_analytics', name='twitter_analytics'),
    url(r'^twitter_login/$', 'helloworld.views.twitter_login', name='twitter_login'),
    url(r'^dashboard/$', 'helloworld.views.dashboard', name='dashboard'),
    url(r'^navigation/$', 'helloworld.views.navigation', name='navigation'),
    url(r'^json_local_tweets/$', 'utilities.twitter_api.json_local_tweets', name='json_local_tweets'),
)
