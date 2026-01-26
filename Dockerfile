FROM node:22.22.0-alpine

WORKDIR /app
COPY build/ build/
COPY server/ server/
COPY public/ public/
COPY node_modules/ node_modules/
COPY package.json ./
COPY environment.js ./

EXPOSE 3000

CMD ["npm", "run", "start"]