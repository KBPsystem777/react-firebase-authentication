import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm />
    </div>
)

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class SignUpFormBase extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }
    onSubmit = e => {
        const { username, email, passwordOne } = this.state

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({ error })
            })
            e.preventDefault()
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state

        // Validation
        const isInValid = passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === ''

        return (
            <div>
                <form onSubmit={ this.onSubmit }>
                    <input
                        name="username"
                        value={ username }
                        onChange={ this.onChange }
                        type="text"
                        placeholder="Full name"
                        required
                    />
                    <input
                        name="email"
                        value={ email }
                        onChange={ this.onChange }
                        type="email"
                        placeholder="Email address"
                    />
                    <input
                        name="passwordOne"
                        value={ passwordOne }
                        onChange={ this.onChange }
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        name="passwordTwo"
                        value={ passwordTwo }
                        onChange={ this.onChange }
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button type="submit" disabled={ isInValid }>
                        Sign Up
                    </button>
                    {
                        error && <p>{ error.message }</p>
                    }
                </form>
            </div>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ ROUTES.SIGN_UP }>
            Sign Up
        </Link>
    </p>
)

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpPage

export { SignUpForm, SignUpLink }