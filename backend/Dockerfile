FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run postinstall

# Build the application
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
