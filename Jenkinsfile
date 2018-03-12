node {
 	  // Clean workspace before doing anything
    deleteDir()

    try {
        stage('check tools') {
            //sh "node -v"
            sh "npm -v"
        }

        stage('checkout') {
            checkout scm
        }

        stage('npm install') {
            sh "npm install"
        }

        stage('protractor tests') {
            sh "npm run e2e"
        }
    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }
}

