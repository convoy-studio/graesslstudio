## Install node dependencies
```
npm install
```

## Install composer
```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === 'e115a8dc7871f15d853148a7fbac7da27d6c0030b848d9b3dc09e2a0388afed865e6a3d6b3c0fad45c48e2b5fc1196ae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

## Install composer dependencies
```
php composer.phar install
```

## Generate a key
```
php artisan key:generate
```

## Create a vhost and add to your hosts for
```
http://graessl-studio.local.net/
```

## Development
```
npm run dev
```

## Production
```
npm run prod
```

For more info https://laravel.com/docs/5.3/elixir
