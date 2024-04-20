docker run --rm --name mongo -h $(hostname) -d -p 27017:27017 mongo --replSet=test && sleep 4 && docker exec mongo mongo --eval "rs.initiate();"
