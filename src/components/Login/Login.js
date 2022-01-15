import React from 'react';

class Login extends React.Component {

    render() {
        return (
            <form>
                <input
                    type='text'
                    placeholder='email'
                    value={this.props.email}
                    onChange={this.props.handleEmail}
                />
                <input
                    type='password'
                    placeholder='password'
                    value={this.props.password}
                    autoComplete='on'
                    onChange={this.props.handlePassword}
                />
                <button onClick={this.props.handleLoginClick}>Log In</button>
            </form>
        );
    }
}

export default Login;