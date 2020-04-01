FROM node:8-alpine
WORKDIR /order-service
COPY package.json /order-service
RUN npm install
COPY . /order-service
CMD ["node","index.js"]
EXPOSE 9002
