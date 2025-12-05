FROM postgres:15-alpine

COPY init-db.sh /usr/local/bin/

RUN apk add --no-cache curl postgresql-client && \
	chmod +x /usr/local/bin/init-db.sh

CMD ["/usr/local/bin/init-db.sh"]