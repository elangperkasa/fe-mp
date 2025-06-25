# Stage 1: Base image with Node.js
FROM node:20.13.1-slim AS base
#===============================================================================
# Stage 2: Install dependencies
FROM base AS dependencies
WORKDIR /app
COPY package*.json ./
# RUN npm ci --frozen-lockfile --verbose
RUN npm install
#===============================================================================
# Stage 3: Create build
FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ENV NODE_OPTIONS="--max-old-space-size=4096"
COPY .env.production ./

RUN npm run build -- --mode=production
#===============================================================================
# Stage 4: Serve with Nginx
FROM nginx:alpine

# Set up work directory
WORKDIR /usr/share/nginx/html

# Copy built files from the build stage
COPY --from=build /app/dist ./

# Copy Nginx config files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/dhparam.pem /usr/local/etc/nginx/dhparam.pem

# Expose necessary ports
EXPOSE 80
EXPOSE 443

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]