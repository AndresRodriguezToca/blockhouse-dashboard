# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY blockhouse-dashboard/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY blockhouse-dashboard /app/

# Expose the port that the React app will run on
EXPOSE 3000

# Run the React development server
CMD ["npm", "run", "dev"]
