FROM	ichikawayukko/svfs_gateway:0.9.1-alpine

RUN	wget -O /usr/bin/twitter https://github.com/IchikawaYukko/twitter-cmd/releases/download/alpha/twitter && \
	chmod +x /usr/bin/twitter && \
	echo '0 18 * * 4 /usr/bin/update.sh >> /update.log' >> /var/spool/cron/crontabs/root

COPY	update.sh /usr/bin/update.sh
CMD	["crond","-fd", "8"]
