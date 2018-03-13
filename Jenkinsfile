#!groovy
pipeline {
    agent any
  
    tools {
      nodejs "default"
    }
  
    options {
        timestamps()
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
                sh "npm i -g protractor"
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
            //wrap([$class: 'Xvfb', screen: '1440x900x24']) {
                echo 'Test e2e...'
                sh 'xvfb-run ng e2e'
            //}
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
