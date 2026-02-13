# Use Node 24 (matches Prisma requirement)
FROM node:24-bullseye

# Set working directory
WORKDIR /app

# Install system dependencies for Playwright/Chromium
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

# Copy all source files first (so Prisma can find schema)
COPY . .

# Install npm dependencies (Prisma generates client here)
RUN npm install

# Install Chromium for Playwright
RUN npx playwright install chromium

# Start scraper
CMD ["npm", "run", "update"]
