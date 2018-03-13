pipeline {
    agent any
  
    tools {
      nodejs "New Node"
    }
  
    options {
        timestamps(),
        skipDefaultCheckout()      // Don't checkout automatically
    }
  
    stages {
        stage('Clone') {
            steps {
                echo 'Cleaning...'
                deleteDir()
              
                echo 'Cloning...'
                checkout scm
              
                echo 'Installing...'
                sh 'node -v'
                sh 'npm --version'
                sh "npm i -g @angular/cli@1.7.0"
                sh "npm install protractor -g"
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'ng build'
            }
        }
        stage('Test') {
            steps {
                echo 'Test e2e...'
                sh 'xvfb-run ng e2e'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
    post {
        failure {
            echo 'Failed!'
        }
    }
}
