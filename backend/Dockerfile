# Use the official lightweight Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally for development
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 3000

# Use nodemon for live reloading
CMD ["npm", "run", "dev"]

