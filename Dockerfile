# Use the official Node image
FROM node:current-alpine3.20

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Copy your environment file (optional for local builds, not for production)
# Instead, we usually pass them via docker run/env files
# COPY .env.local .env

# Expose the port
EXPOSE 3001

# Start the app
CMD ["node", "app.js"]
