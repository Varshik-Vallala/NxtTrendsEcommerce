# FROM - Set Base Image
FROM node:16 AS builder

# LABEL - add custom data, just some key values
LABEL maintainer="Frontend API Maintainers"


# RUN - execute commands
RUN mkdir frontend

# WORKDIR - working directory
WORKDIR /frontend

COPY package*.json ./


# RUN - Installing the dependencies
RUN npm install

# COPY - copy files to above image
COPY . .

#Build the React App
RUN npm run build

# FROM - To Deploy
FROM nginx

# COPY - copy files to Nginx
COPY --from=builder /frontend/dist /usr/share/nginx/html
