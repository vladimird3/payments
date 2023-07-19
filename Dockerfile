FROM node:16-alpine
COPY package.json .
COPY package-lock.json .
RUN mkdir -p /domain_verification
COPY domain_verification/cert.p12 ./domain_verification
ARG CACHEBUST=1
RUN npm install
ENV NODE_ENV production
ADD src ./src

EXPOSE 6050

CMD [ "npm", "start" ]
