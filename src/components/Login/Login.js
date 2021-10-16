import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { googleSignIn, signInWithEmail, error, isLoading } = useAuth();
    const location = useLocation();
    const redirect_uri = location.state?.from || '/home';
    const history = useHistory();
    // console.log('came from', location.state?.from);
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    if (isLoading) {
        return <Spinner animation="border" />
    }
    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmail({ email, password })
            .then((result) => {
                alert('Successfully Logged In!');
                history.push(redirect_uri);
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                history.push(redirect_uri);
            })
    }
    return (
        <div>
            <h2>Please,Login...</h2>
            <h4>{error}</h4>
            <div className="mb-3 w-50 mx-auto">
                <Form onSubmit={handleSignIn}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" onBlur={handleEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" className="mb-3" placeholder="Password" onBlur={handlePassword} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
            <p>-------------or-------------</p>
            <button className="btn btn-warning" onClick={handleGoogleSignIn}>Google Sign In</button>
            <p>New Customer? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;