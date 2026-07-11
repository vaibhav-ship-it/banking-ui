pipeline {
    agent any
    triggers { githubPush() }
    environment {
        IMAGE_NAME = 'banking-ui'
        IMAGE_TAG = 'v1'
        CONTAINER_NAME = 'banking_ui_container'
    }
    stages {
        stage('Build') {
            steps {
                powershell """
                    dir
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    docker build -t $IMAGE_NAME:$IMAGE_TAG .
                    dir
                """    
            }
        }
        stage('Remove Old Contaner')    {
            steps {
                powershell '''
                    $containerId = docker ps -q -f "name=$CONTAINER_NAME"

                    if ($containerId) {
                        docker stop $CONTAINER_NAME
                        docker rm $CONTAINER_NAME
                    }
                '''
            }
        }
        stage('Run New Container')   {
            steps {
                powershell """
                    docker run -d --name=$CONTAINER_NAME -p 4200:4200 $IMAGE_NAME:$IMAGE_TAG
                """
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
        always {
            cleanWs()
        }
    }
}
