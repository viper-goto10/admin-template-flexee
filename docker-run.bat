docker rm -f accenture
docker build -f Dockerfile -t accenture .
docker run --name accenture -p 1000:80 accenture