node('node') {
 	  // Clean workspace before doing anything
    deleteDir()
  
    try {
      
        stage('Install NodeJS and NPM') {
            def nodeHome = tool name: 'NodeJS 7.2.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            env.PATH = "${nodeHome}/bin:${env.PATH}"
        }

        stage('Check tools') {
            sh "node -v"
            sh "npm -v"
        }

        stage('Checkout') {
            checkout scm
        }

        stage('Install Dependencies') {
            sh "npm install --silent"
            sh "npm install -g @angular/cli@latest"
            sh "ng set --global warnings.versionMismatch=false"
            sh "npm install protractor -g"
        }

        stage('protractor tests') {
            sh "webdriver-manager update --versions.chrome=2.30 --gecko=false"
            sh "ng e2e"
        }
    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }
}

