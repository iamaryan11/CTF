
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend


COPY FrontEnd/package*.json ./
RUN npm ci


COPY FrontEnd/ ./
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app


ENV NODE_ENV=production


COPY BackEnd/package*.json ./BackEnd/
RUN cd BackEnd && npm ci --only=production


COPY BackEnd/ ./BackEnd/



COPY --from=frontend-builder /app/frontend/dist ./BackEnd/public


EXPOSE 5000


WORKDIR /app/BackEnd


CMD ["node", "src/index.js"]