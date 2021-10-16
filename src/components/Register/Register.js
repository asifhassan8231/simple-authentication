import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confiremPassword, setConfirmPassword] = useState('');
    const [regError, setRegError] = useState('');
    const { googleSignIn, createUser, error, isLoading } = useAuth();
    const location = useLocation();
    const redirect_uri = location.state?.from || '/home';
    const history = useHistory();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handlePasswordConfirm = (e) => {
        setConfirmPassword(e.target.value);
    }

    if (isLoading) {
        return <Spinner animation="border" />
    }
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                history.push('/home');
            })
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        console.log(password, confiremPassword);
        if (password.length < 6) {
            setRegError('Password Must be at least 6 characters long!');
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setRegError('Password Must contain 2 upper case');
            return;
        }
        if (password !== confiremPassword) {
            setRegError('Password did not matched!')
            return;
        }
        createUser({ email, password })
            .then(result => {
                alert('Successfully Registered!');
                history.push(redirect_uri);
            })
    }
    return (
        <div>
            <h2>Please,Register...</h2>
            <h4>{error}</h4>
            <div className="mb-3 w-50 mx-auto">
                <Form onSubmit={handleRegistration}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" onBlur={handleEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" className="mb-3" placeholder="Password" onBlur={handlePassword} />
                        <Form.Control type="password" placeholder="Confirm Password" onBlur={handlePasswordConfirm} />
                    </Form.Group>
                    <p>{regError}</p>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
            <p>-------------or-------------</p>
            <button className="btn btn-warning" onClick={handleGoogleSignIn}>Google Sign up</button>
            <p>Already Have an account? <Link to="/login">Log In</Link></p>
        </div>
    );
};

export default Register;