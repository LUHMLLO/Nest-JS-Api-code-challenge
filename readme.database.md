# Crea la db en docker

```ps
docker run --name realbankDB -e POSTGRES_DB=realbank -e POSTGRES_USER=bankadmin -e POSTGRES_PASSWORD=tS6k@8C2 -p 5432:5432 -d postgres:latest
```
