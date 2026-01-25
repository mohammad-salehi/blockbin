FROM docker.arvancloud.ir/node:20-alpine

WORKDIR /app


RUN npm config set registry https://mirror-npm.runflare.com

COPY package*.json ./

RUN npm ci

RUN node -p "require('react/package.json').version" \
 && npm ls @headlessui/react --depth=0 || true
 
COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=4173

EXPOSE 4173

CMD ["npm", "run", "start", "--", "-p", "4173"]
