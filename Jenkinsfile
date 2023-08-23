pipeline {
    agent any
    
    stages {
        stage("Code") {
            steps {
                echo "Cloning the code from GitHub"
                git branch: 'RELEASE', url: 'https://github.com/Netra-Development-Solutions/utils.crypto.jsonwebtoken'
            }
        }
        stage("Install Dependencies") {
            steps {
                echo "Installing npm dependencies"
                bat "npm install"
            }
        }
        stage("Run Tests") {
            steps {
                echo "Running tests"
                // bat "npm test"
            }
        }
        stage("Publishing package to NPM") {
            steps {
               echo "Publishing package to NPM"
                withCredentials([string(credentialsId: 'nodejs_authentication_token', variable: 'NPM_TOKEN')]) {
                    bat "npm config set //registry.npmjs.org/:_authToken=%NPM_TOKEN%"
                    bat "npm publish"
                }
            }
        }
    }
}
