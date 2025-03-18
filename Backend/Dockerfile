FROM node:20-alpine as BUILD_IMAGE

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy src code
COPY . .

# Build
RUN npm run build

# Remove dev dependencies
RUN npm prune --omit=dev

FROM node:20-alpine

WORKDIR /app

# Copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/.env ./.env

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
