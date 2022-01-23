## About the Shorten URL

This makes url to shorten.
This uses laravel as backend and reactjs as frontend.
user can create his account and login with it to the site.
user can create the shorten url and redirect it as origin url.

### how to make the shorten url
This will save the unique origin url and get the big integer value from db (primary key of the saved url).
Then this will encode the value as encode base62 and return it.
When user input the shorten url, server will get the encoded string from that url and decode it as the integer and get the origin url with it.
Then it will redirect the url with the origin url.
User can create edit, delete and see the count that shows how many the shorten url has been used.



## Run Dev

### install composer
composer install

### db
php artisan migrate

### run server
php artisan serve

### install node packages
npm install

### run watch npm
npm run watch
