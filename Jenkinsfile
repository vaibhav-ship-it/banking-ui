pipeline {
    agent any
    triggers { githubPush() }
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
                    npx http-server ./dist/banking/browser -p 4200 -c-1 --proxy http://localhost:4200?
                """    
            }
        }
    }
}
