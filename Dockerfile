# build stage
FROM node:lts-alpine as build-stage

ARG FIREBASE_API_KEY
ENV REACT_APP_API_KEY=${FIREBASE_API_KEY}

ARG PROJECT_ID
ENV REACT_APP_PROJECT_ID=${PROJECT_ID}

ARG MAPS_API_KEY
ENV REACT_APP_MAPS_API_KEY=${MAPS_API_KEY}

ARG API_URL_SUB
ENV REACT_APP_API_URL_SUB=${API_URL_SUB}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build


# production stage
FROM nginx:stable-alpine as production-stage

RUN apk add --no-cache bash
COPY --from=build-stage /app/dist /usr/share/nginx/html

#COPY env.sh /usr/share/nginx/html
#COPY .env /usr/share/nginx/html
#RUN chmod +x /usr/share/nginx/html/env.sh
WORKDIR /usr/share/nginx/html

# Cloud Run requires port 8080. Let's change nginx...
RUN sed -i 's/80/8080/g' /etc/nginx/conf.d/default.conf
EXPOSE 8080

#CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
