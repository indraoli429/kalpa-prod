# OS (SERVER)
FROM node:18-alpine AS kalpaapi
# Set one or more individual labels
LABEL org.opencontainers.image.authors="indra.oli@nicnepal.org"
LABEL com.kalpaapi.version="0.0.1-beta"
LABEL vendor="NICN Software"
LABEL vendor2="EBS"
LABEL com.kalpaapi.release-date="2023-01-14"
LABEL com.kalpaapi.0.0.1-beta.is-production="False"

WORKDIR /kalpaapi
COPY package.json .

RUN npm install -g typescript
RUN npm install

COPY . .

RUN npm run build
# Default Command
CMD ["node", "built/index.js"]
EXPOSE 5000