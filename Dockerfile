FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g http-server
COPY dist/banking/browser /app
CMD ["http-server", "/app", "-p", "4200", "--proxy", "http://localhost:4200?"] 