FROM node:8-alpine
WORKDIR /aggregate-service
COPY package.json /aggregate-service
RUN npm install
COPY . /aggregate-service
CMD ["node","index.js"]
EXPOSE 9001
