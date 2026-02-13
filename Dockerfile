# Use Playwright's official image with all browsers & deps preinstalled
FROM mcr.microsoft.com/playwright:focal

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Command to start your server
CMD ["npx", "ts-node", "server/src/index.ts"]
