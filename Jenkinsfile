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
        stage('Installing') {
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
    }

    post {
        failure {
            echo 'Failed!'
        }
    }
}


/*node {
    stage('install node and npm') {
        def nodeHome = tool name: 'node-9.3.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${nodeHome}:${nodeHome}/bin:${env.PATH}"
    }
  
    stage('check tools') {
        echo env.PATH
        sh "node -v"
        sh "npm -v"
        sh "npm i -g @angular/cli"
        //sh "npm rebuild node-sass --force"
    }

    stage('checkout') {
        checkout scm
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('npm run build dev') {
        sh "npm run build:dev"
    }

    stage('npm clean') {
        sh "npm run clean"
    }

    stage('npm run build prod') {
        sh "npm run build:prod"
    }

    stage('npm run build ssr') {
        sh "npm run build:ssr"
    }

    stage('npm test') {
        sh "xvfb-run npm run test:ci:jenkins"
    }

    stage('npm e2e') {
        sh "xvfb-run npm run e2e:ci"
    }

    stage('npm typedoc') {
        sh "npm run docs:typedoc"
    }

    stage('npm compodoc') {
        sh "npm run docs:compodoc"
    }
}*/
