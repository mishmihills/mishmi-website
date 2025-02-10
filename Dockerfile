# Stage 1: Build Next.js App
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production Image with Puppeteer & Chromium
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Chromium and required dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# Install Puppeteer (without bundled Chromium)
RUN npm install puppeteer@latest --omit=dev \
    && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app ./

# Set Chromium path for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# Expose the Next.js default port
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "run", "start"]
