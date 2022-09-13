FROM node:14-slim as base
WORKDIR /usr/src/app
COPY . .
RUN REACT_APP_BACKEND_API=http://localhost:3300 npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=base /usr/src/app/build .
#RUN npm run build
#CMD [ "pwd" ]

# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# ADD ./build .
