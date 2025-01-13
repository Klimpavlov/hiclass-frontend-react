# Step 1: Use Node.js as the base image to build the application
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the project files
COPY . .

# Install dependencies
RUN npm install

# Build the Next.js app for production
RUN npm run build

# Start the Next.js production server
CMD ["npm", "run", "start"]