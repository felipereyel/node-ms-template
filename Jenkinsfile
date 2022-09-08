pipeline {
   agent any

   environment {
     IMAGE_LATEST_TAG = "REPO-NAME-latest"
     IMAGE_TAG = "REPO-NAME-${GIT_COMMIT}"
   }

   stages {
      stage('Preparation') {
         steps {
          cleanWs()
          git credentialsId: 'github-credentials', url: "https://github.com/abstra-app/REPO-NAME"
         }
      }

      stage('Build and Push Image') {
         steps {
           sh 'docker build -t $ECR_REPO:$IMAGE_LATEST_TAG -t $ECR_REPO:$IMAGE_TAG .'
           sh 'docker push $ECR_REPO:$IMAGE_LATEST_TAG'
           sh 'docker push $ECR_REPO:$IMAGE_TAG'
         }
      }

      stage('Deploy to EKS Cluster') {
         steps {
          git credentialsId: 'github-credentials', url: "https://github.com/abstra-app/infrastructure", branch: "master"
          sh 'envsubst < eks-cluster/applications/REPO-NAME/REPO-NAME.yaml | kubectl apply -f -'
         }
      }
   }
}