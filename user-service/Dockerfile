FROM node:8-alpine
WORKDIR /user-service
COPY package.json /user-service
RUN npm install
COPY . /user-service
CMD ["node","index.js"]
EXPOSE 9000
