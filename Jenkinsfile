pipeline {
    agent any
    triggers { githubPush() }
    stages {
        stage('Checkout') {
            steps { git 'https://github.com/vaibhav-ship-it/banking-ui.git' }
        }
        stage('Build') {
            steps {
                powershell """
                    dir
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    dir
                """    
            }
        }
    }
}
