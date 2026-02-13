# Use Node 24 (matches your local & Prisma requirement)
FROM node:24-bullseye

# Set working directory
WORKDIR /app

# Install dependencies needed for Playwright/Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxss1 \
    libnss3 \
    libgbm1 \
    libatspi2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Install Playwright Chromium
RUN npx playwright install chromium

# Start your scraper
CMD ["npm", "run", "update"]
