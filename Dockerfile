FROM node:22
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
CMD ["npm", "run", "start"]