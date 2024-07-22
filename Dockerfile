# Stage 1: Build the Angular application
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to leverage Docker cache
COPY package*.json ./

# Install dependencies, respecting older peer dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the application in production mode
RUN npm run build --prod

# Stage 2: Set up the Nginx server
FROM nginx:alpine

# Copy the built app from the previous stage into the Nginx server directory
COPY --from=build /app/dist/td-dynapix-dooh-frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the container
EXPOSE 80

# Start Nginx and keep the process in the foreground
CMD ["nginx", "-g", "daemon off;"]