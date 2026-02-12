# Use the official Playwright image (includes Node.js, browsers, and all Linux deps)
FROM ://mcr.microsoft.com

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Build your TypeScript code
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]
