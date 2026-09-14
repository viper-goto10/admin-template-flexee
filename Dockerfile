FROM goto10hq/viper-php-8.4

ADD /src /var/www/src
ADD /demo /var/www/demo
COPY package.json /var/www
COPY package-lock.json /var/www
COPY webpack.config.js /var/www
COPY .babelrc /var/www

RUN apt-get update && apt-get install -y curl

ENV NODE_VERSION=24.19.0
ENV NODE_DOWNLOAD_SHA=f625d97cd707df4ff96254916fbc5ff014f09c09effe5a1e0ca8f6d41a8789d4
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

RUN apt-get update && apt-get install -y nodejs

ENV NODE_ENV=development
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

