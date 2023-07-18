FROM node:16-alpine
COPY package.json .
COPY package-lock.json .
ARG CACHEBUST=1
RUN npm install
ENV NODE_ENV production
ADD src ./src

EXPOSE 6050

CMD [ "npm", "start" ]
