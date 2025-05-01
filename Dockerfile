# 
# Command line for runningthe frontend on Docker
# docker build -t mflibrary-frontend .
# docker run -d -p 8080:80 --name mflibrary-frontend mflibrary-frontend
#

# Stage 1: Build Angular app
FROM node:slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration=production

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from builder stage
COPY --from=builder /app/dist/mflibrary-frontend/browser /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
