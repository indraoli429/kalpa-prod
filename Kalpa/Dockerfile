# OS (UI)
FROM node:18-alpine AS kalpaui
# Set one or more individual labels
LABEL org.opencontainers.image.authors="indra.oli@nicnepal.org"
LABEL com.kalpa.version="0.0.1-beta"
LABEL vendor="NICN Software EBS"
LABEL com.kalpa.release-date="2023-01-14"
LABEL com.kalpa.0.0.1-beta.is-production="False"

WORKDIR /kalpaui
COPY package.json .
# RUN npm install
RUN npm install --legacy-peer-deps 

COPY . .

RUN npm run build

# Default Command
# CMD ["npm", "start"]
# EXPOSE 3000

FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=kalpaui /kalpaui/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]