FROM node:16.11.1
WORKDIR /app/frontend
COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-scripts@4.0.3 -g
COPY . ./
EXPOSE 3000