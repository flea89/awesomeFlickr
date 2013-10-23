Awesome Flickr [![Build Status](https://travis-ci.org/flea89/awesomeFlickr.png?branch=master)](https://travis-ci.org/flea89/awesomeFlickr)
=================

Flickr Gardern App

v0.1.0 Goals:

* Display a list of public feeds against tag name given by the user
* Display a the detail of the feed
* 
##Installation 

1. Clone the project on your local machine
2. Run `npm install & bower install`
3. Start your server using `grunt server`

##Test

1. Run `grunt test` to run karma unit test
2. Run `grunt e2e-test` to run scenario test ( be sure to have the server running on port 9000, if not run before `grunt server`) 

##TODO
1. Add animations: the configuration and upgrade of Angular to the 1.2.0 is done.
2. Infinite scolling: remove elements from the DOM in order to garantuee a smoother scroll on mobile devices.
3. Feed detail page linkability: the API used doesn't allow to fetch a single public feed. This imply that is not possible to have linkability of the detail pages. However the application is designed to easy integrate this feature, since the API to get a feed in the detail page are asyncronous.
4. Add documentation, JsDoc

##Other
1. The directive post detail stylesheet is an example of BEM syntax convention.