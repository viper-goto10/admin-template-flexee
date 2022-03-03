FROM goto10hq/viper-php-8.1

ADD /src /var/www/src
ADD /demo /var/www/demo
COPY package.json /var/www
COPY package-lock.json /var/www
COPY webpack.config.js /var/www
COPY .babelrc /var/www

ENV NODE_ENV development
WORKDIR /var/www
RUN rm -rf node_modules
RUN npm i
RUN npm run build:prod

RUN mv /var/www/demo/bundles /var/www/html/bundles
RUN mv /var/www/demo/index.html /var/www/html

RUN a2enmod rewrite
RUN a2enmod headers

RUN apt-get clean 
RUN apt-get -y purge
RUN rm -rf /usr/local/bin/nodejs
RUN rm -rf /var/www/node_modules

WORKDIR /

