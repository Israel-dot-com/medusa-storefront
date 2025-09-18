FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Set backend URL for build time
#test 4 env
ARG MEDUSA_BACKEND_URL=http://localhost:9000
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=${MEDUSA_BACKEND_URL}

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]

