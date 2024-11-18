# Use the official Node.js image as the base image
FROM docker.io/library/node

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Build the Angular app
RUN npm install -g @angular/cli

# && ng build --configuration=production --output-path=/dist

# Copy the rest of the app files to the working directory
COPY . .

# Expose port 4200 for the Angular CLI development server
EXPOSE 4200

# Define the command to run your Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]
