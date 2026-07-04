pipeline {
    agent any

    stages {
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
