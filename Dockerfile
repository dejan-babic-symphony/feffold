# Stage 1: Build the Vite React App
FROM node:22.12.0-alpine3.21  as build-stage

ENV VITE_ENV_EXAMPLE="PLACEHOLDER_VITE_ENV_EXAMPLE"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy the rest of your application code to the container
COPY . .

# Build the Vite React App
RUN npm run build

# Stage 2: Create the production-ready Nginx image
FROM nginx:alpine3.20

RUN apk add --upgrade expat

# Copy entrypoint scripts
COPY ./scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /usr/share/nginx/html/

# Copy the dist (built) Vite React App from the build stage to the Nginx container
COPY --from=build-stage /app/dist .

COPY scripts/nginx/default.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Replace Runtime ENV vars and start Nginx when the container runs
ENTRYPOINT ["/entrypoint.sh"]
