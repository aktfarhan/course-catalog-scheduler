FROM node:24-bullseye

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

# Copy all files first (so Prisma can find schema)
COPY . .

# Install npm dependencies
RUN npm install

# Install Chromium
RUN npx playwright install chromium

# Run your scraper
CMD ["npm", "run", "update"]
