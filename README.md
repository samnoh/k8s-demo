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

-   Delete config

```bash
kubectl delete deployments test-deploy.yaml
kubectl delete -f k8s
kubectl delete secrets aws_access_key
```

### Deployments - Controllers

-   A deployment controller provides declarative updates for Pods and ReplicaSets

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: deployment-name
spec:
    selector: # define how the deployment finds which pods to control
        matchLabels:
            app/name: example
    replicas: 3 # create 3 pods
    template:
        metadata:
            labels:
                app/name: example
        spec:
            containers:
                - name: container-name
                  image: image-name
                  env: # set environment variables
                      - name: key
                        value: value
                  ports:
                      - containerPort: 8080
```

### Persistent Volume Claim

-   PVCs are requests for resources (PV) in the cluster and also act as claim checks to the resource

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: example-pv-claim
spec:
    accessModes:
        - ReadWriteOnce # for at least one Node
    resources:
        requests:
            storage: 3Gi # at least three gibibytes that can provide R/W access
```

-   Create an object that uses the PVC as a volume

```yaml
spec:
    containers:
        volumeMounts:
            - name: postgres-storage
              mountPath: /var/lib/postgresql/data
              subPath: postgres
```

### Secrets

-   Create secrets

```bash
kubectl create secret generic <secret_name> --from-literal <key>=<value>
```

-   Using secrets as environment variables

```yaml
env:
    - name: PASSWORD
      valueFrom:
          secretKeyRef:
              name: password
              key: PASSWORD
```

### Services

#### ClusterIP

-   Exposes a set of pods to other object in the cluster

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-service
spec:
    type: ClusterIP
    selector:
        app/name: example
    ports:
        - port: 80
          targetPort: 8080
```

####Ingress

-   Exposes a set of services to the outside world

-   [`nginx ingress`](https://kubernetes.github.io/ingress-nginx/)

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml
```
