# Kubernetes

## `TIL`

### Basic Commands

-   Read

```bash
kubectl get pods
kubectl get deploy # deployments
kubectl get svc # serivces
kubectl get secrets
kubectl get pvc # persistentVolumeClaims
```

-   Apply changes

```bash
kubectl apply -f test.yaml
kubecll apply -f k8s
```

-   Delete Config

```bash
kubectl delete deployments test-deploy.yaml
kubectl delete -f k8s
kubectl delete secrets aws_access_key
```

### Deployments

### Services

#### ClusterIP

-   Exposes a set of pods to other object in the cluster

####Ingress

-   Exposes a set of services to the outside world

-   `nginx ingress`

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml
```

### Persistent Volume Claim

### Secret
