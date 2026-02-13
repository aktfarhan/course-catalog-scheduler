# Use Playwright official image with Chromium and all deps preinstalled
FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Ensure Chromium is installed
RUN npx playwright install chromium

# Start the scraper
CMD ["npm", "run", "update"]
