# SSL

## Create DH Parameter (FE Only)

openssl dhparam -out ./nginx/dhparam.pem 2048

# APP Name

POWER-APPROVAL `power-approval-fe`

# Docker

```bash
# BUILD
$ docker buildx build --platform=linux/amd64 -t asia-southeast2-docker.pkg.dev/ptpl-devops-prod/docker-prod/power-approval-fe -f ./devops/production/Dockerfile .

# PUSH
$ docker push asia-southeast2-docker.pkg.dev/ptpl-devops-prod/docker-prod/power-approval-fe
```

### Deployment

```bash

# DEPLOYMENT
$ kubectl apply -f ./devops/production/deploy.yaml

```
