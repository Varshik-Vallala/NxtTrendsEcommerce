pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "bunny59/trendsecomm2"
        BUILD_TAG = "${BUILD_NUMBER}"  // Generates a new tag for each build
    }

    stages {
        stage('Code Checkout') {
            steps {
                git 'https://github.com/Varshik-Vallala/NxtTrendsEcommerce.git'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$BUILD_TAG .'
                sh 'docker tag $DOCKER_IMAGE:$BUILD_TAG $DOCKER_IMAGE:latest'  // Keep latest tag
            }
        }
        stage('Login to Docker') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'Docker') {
                        sh 'docker push $DOCKER_IMAGE:$BUILD_TAG'
                        sh 'docker push $DOCKER_IMAGE:latest'  // Update latest tag
                    }
                }
            }
        }
        stage('Deploy'){
            steps {
                sh 'docker container run -dt --name ecomm -p 80:80 $DOCKER_IMAGE:$BUILD_TAG'
                sh 'echo Container Success'
            }
        }
        
    }
}
