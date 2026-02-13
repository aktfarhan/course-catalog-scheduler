# Use Playwright image with Node 24 + all deps
FROM mcr.microsoft.com/playwright:v1.41.0-focal-node24

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Install Chromium
RUN npx playwright install chromium

# Start scraper
CMD ["npm", "run", "update"]
