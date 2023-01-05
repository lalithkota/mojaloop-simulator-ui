FROM node:8.15-jessie
# First part, build the app
WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY ./ /app/

# Adds the package version and commit hash 
ENV NODE_ENV "production"
RUN npm run build

# Second part, copy the build and server the app using a node express server

RUN cp -r /app/build /app/server/

WORKDIR /app/server
RUN npm install

EXPOSE 8080

ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "npm", "start" ]
