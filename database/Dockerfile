
FROM postgres:16-alpine

COPY --chown=postgres:postgres init.sql /docker-entrypoint-initdb.d/01-init.sql

EXPOSE 5432
