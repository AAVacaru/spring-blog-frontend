FROM node:18.12.1 as builder
RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

CMD ["npm", "start"]