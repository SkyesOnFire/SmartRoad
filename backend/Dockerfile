# Pull in the official lightweight version of Node 14.
FROM node:lts-slim

# Create and change to the app directory.
WORKDIR /app

COPY package.json .

# Install production dependencies.
RUN yarn

# Copy local codebase into the container image
COPY . .

# Compile down to ES5 with Babel
RUN yarn build

# Run migrations
# RUN ./node_modules/.bin/typeorm migration:run

# Remove unused src directory
RUN rm -rf src/

# Start the api server
CMD [ "yarn", "start" ]
