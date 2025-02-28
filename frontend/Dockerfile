# Use Node.js as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire frontend code
COPY . .

# Expose the port that Vite uses (5173)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
