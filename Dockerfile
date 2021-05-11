# FROM node:lts-alpine

# # install simple http server for serving static content
# RUN npm install -g http-server

# # make the 'app' folder the current working directory
# WORKDIR /app

# # copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./

# # install project dependencies
# RUN npm install

# EXPOSE 8080
# CMD [ "http-server", "dist" ]

FROM node:15
RUN npm install -g http-server
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install
ENV NODE_ENV=production
RUN npm run build

# Remove unused directories
RUN rm -rf ./src
RUN rm -rf ./build

# Port to expose
EXPOSE 8080
CMD ["http-server", "dist"]
