FROM docker.arvancloud.ir/node:latest AS builder
ARG NODE_ENV
ARG PROJECT_ENV_FILE
WORKDIR /app
RUN npm config set registry https://mirror-npm.runflare.com
COPY . .
RUN npm install --legacy-peer-deps
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN MODE="$NODE_ENV"; \
    if [ -z "$MODE" ] && [ -n "$PROJECT_ENV_FILE" ]; then \
      if echo "$PROJECT_ENV_FILE" | grep -qi "development"; then MODE=development; else MODE=production; fi; \
    fi; \
    if [ -z "$MODE" ]; then MODE=production; fi; \
    echo ">>> Building with mode=$MODE (NODE_ENV=$NODE_ENV, PROJECT_ENV_FILE=$PROJECT_ENV_FILE)"; \
    npm run build -- --mode "$MODE"

FROM docker.arvancloud.ir/nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4173
CMD ["nginx", "-g", "daemon off;"]