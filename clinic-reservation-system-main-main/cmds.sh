docker build --pull --rm -f "front\Dockerfile" -t front:latest
docker run --rm -d -p 4200:4200/tcp -p 80:80/tcp front:latest

docker build --pull --rm -f "back\Dockerfile" -t back:latest
docker run --rm -d -p 5000:5000/tcp back:latest

docker build --pull --rm -f "db\Dockerfile" -t db:latest
docker run --rm -d -p 27017:27017/tcp db:latest