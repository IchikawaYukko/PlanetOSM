FROM	centos:7

RUN	yum install -y fuse ruby wget cronie epel-release && \
	yum install -y pv && \
	curl -sLO https://github.com/ovh/svfs/releases/download/v0.9.1/svfs-0.9.1-1.x86_64.rpm && \
	useradd xlucas && \
	rpm -ivh svfs-0.9.1-1.x86_64.rpm && \
	rm svfs-0.9.1-1.x86_64.rpm && \
	mkdir /scripts && \
	echo '0 18 * * 4 root /scripts/update.sh >> /update.log' >> /etc/crontab

COPY	*.sh /scripts/
COPY	twitter /usr/bin/twitter
CMD	mount -t svfs /dev/hoge /mnt/ && crond -n
#CMD tail -f /dev/null
