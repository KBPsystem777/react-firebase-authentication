import app from 'firebase/app'

require('dotenv')

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_API_KEY_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
    constructor() {
        app.initializeApp(config)
        
        this.auth = app.auth()
    }

    // Auth API

    // Email SignUp
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password)
    
    // Email SignIn
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    // SignOut
    doSignOut = () => this.auth.signOut()

    // Password Reset
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

    // Password Change
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password)
}

export default Firebase