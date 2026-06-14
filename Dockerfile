FROM node:20-alpine

LABEL maintainer="Web Programlama Dersi"
LABEL description="Docker Deployment Demo - Web + Mini Backend"
LABEL version="1.1"

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY index.html .
COPY style.css .
COPY script.js .
COPY server.js .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
