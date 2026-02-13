FROM mcr.microsoft.com/playwright:v1.41.0-focal-node20.19

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx playwright install chromium

CMD ["npm", "run", "update"]
