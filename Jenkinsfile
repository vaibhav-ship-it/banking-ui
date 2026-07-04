pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat """
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
