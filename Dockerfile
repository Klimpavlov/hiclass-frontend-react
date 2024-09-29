# Step 1: Use Node.js as the base image to build the application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app for production
RUN npm run build

# Step 2: Use a smaller Node.js image to serve the application
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app ./

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "run", "start"]
