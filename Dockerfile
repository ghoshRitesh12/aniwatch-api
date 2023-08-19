FROM node:18-alpine

LABEL description="Aniwatch API docker image"
LABEL org.opencontainers.image.source https://github.com/ghoshRitesh12/aniwatch-api

# create a non-privileged user
RUN addgroup -S aniwatch && adduser -S zoro -G aniwatch

# set secure folder permissions
RUN mkdir /app && chown -R zoro:aniwatch /app

# set non-privileged user
USER zoro

# set working directory
WORKDIR /app

# copy config file for better use of layers
COPY --chown=zoro:aniwatch package.json .

# install dependencies
RUN npm install --omit=dev --ignore-scripts

# copy all necessary files in the container (except ones in .dockerignore)
COPY --chown=zoro:aniwatch . .

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s CMD [ "npm", "run", "healthcheck" ]

ENV NODE_ENV=production
ENV PORT=4000

# exposed port
EXPOSE 4000

CMD [ "node", "dist/server.js" ]
