docker build -t samnoh/multi-client:latest -t samnoh/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t samnoh/multi-server:latest -t samnoh/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t samnoh/multi-worker:latest -t samnoh/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push samnoh/multi-client:latest
docker push samnoh/multi-server:latest
docker push samnoh/multi-worker:latest

docker push samnoh/multi-client:$SHA
docker push samnoh/multi-server:$SHA
docker push samnoh/multi-worker:$SHA

# Apply config changes
kubectl apply -f k8s

# Update images
kubectl set image deployments/client-deployment client=samnoh/multi-client:$SHA
kubectl set image deployments/server-deployment server=samnoh/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=samnoh/multi-worker:$SHA