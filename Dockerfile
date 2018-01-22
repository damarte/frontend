FROM node:8.6.0
RUN mkdir -p /var/www/html/combinacion/ngx-admin
WORKDIR /var/www/html/combinacion/ngx-admin
COPY package.json package.json
RUN npm install --global gulp
RUN npm install semantic-ui@2.1.8 --save
RUN npm install
COPY . .
EXPOSE 4200
CMD npm start
