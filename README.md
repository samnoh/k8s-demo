# Kubernetes

## `TIL`

### Basic Commands

-   Read

```bash
kubectl get po # pods
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

### Controllers

#### Deployment

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

#### Ingress - nginx ingress

-   Exposes a set of services to the outside world

-   [`NIGNX Ingress Controller`](https://kubernetes.github.io/ingress-nginx/)
-   Install

```yaml
helm install stable/nginx-ingress --name my-nginx # no RBAC (dev only)
```

-   Ingress config

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
    name: ingress-service
    annotations:
        kuberneties.io/ingress.class: nginx
        nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
    rules:
        - http:
              paths:
                  - path: /api/?(.*)
                    backend:
                        serviceName: back-cluster-ip
                        servicePort: 5000
                  - path: /?(.*)
                    backend:
                        serviceName: front-cluster-ip
                        servicePort: 8080
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
        - name: mysql
          image: mysql
          volumeMounts:
              - name: site-data
                mountPath: /var/lib/mysql
                subPath: mysql
    volumes:
        - name: site-data
          persistentVolumeClaim:
          claimName: example-pv-cliam
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

### Skaffold

-   [Skaffold Docs](https://skaffold.dev/docs/references/yaml/)
-   Install

```bash
brew install skaffold # MacOS only
```

-   `skaffold.yaml`

```yaml
apiVersion: skaffold/v1beta13
kind: Config
build:
    local:
        push: false # local development only
    artifacts:
        - image: example/frontend # image name
          context: frontend # path
          docker:
              dockerfile: Dockerfile.dev # specify dockerfile name
deploy:
    kubectl:
        manifests:
            - k8s/*.yaml
```

-   Run dev mode

```bash
skaffold dev
```
