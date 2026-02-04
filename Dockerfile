FROM ubuntu:latest
LABEL authors="fedotarte"

ENTRYPOINT ["top", "-b"]