import React, { useState, Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import decode from 'jwt-decode';
import { loginUser } from '../api';

class Login extends Component
{
    constructor(props){
        super(props);

        this.state = {
            auth: this.props.auth,
            loginSuccess: false,
            showMessage: false,
            validationMessage: '',
            login: {
                email: '',
                password: ''
            }
        };
    }

    render() {
        let { loginSuccess, showMessage, validationMessage } = this.state;
        return (
            <Container>
                <Row className='justify-content-center align-items-center'>
                    <Col xs={12} sm={6}>
                        <h1 className='text-center'>Login</h1>
                    </Col>
                </Row>
                <hr className='w-50'/>
                <Container>
                    <Form>
                        {   
                            showMessage &&
                            <Row className="justify-content-center">
                                <Col xs={10} sm={8} md={5}>
                                    <div>{validationMessage}</div>
                                </Col>
                            </Row>
                        }
                        <Row className="justify-content-center">
                            <Col xs={10} sm={8} md={5}>
                                <Form.Group controlId="loginUserName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control name="email" type="input" placeholder="UserName" onChange={this.handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col xs={10} sm={8} md={5}>
                                <Form.Group controlId="loginPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="justify-content-center pb-2">
                            <Col xs={3} className='text-center'>
                                <Button variant="primary" type="submit" onClick={this.handleSave}>
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                {loginSuccess && <Redirect to="/" />}
            </Container>
        );
    };

    // ATG:: HANDLE CHANGE FUNCTION FOR FORM DATA
    handleChange = (e) => {
        let { login } = this.state;
        login[e.target.name] = e.target.value;
        this.setState({login});
    }
    
    // ATG:: FUNCTION TO TOGGLE THE EDIT/SHOW PAGE AND SAVE THE EDIT PAGE
    handleSave = (e) => {
        e.preventDefault();
        let { auth, login, validationMessage } = this.state;
        let token, decoded_token;


        // ATG:: CALL LOGIN FUNCTION
        loginUser(login)
        .then(data => {
            console.log(data);
            validationMessage = data.message;
            token = data.token;

            if(!token) {
                this.setState({
                    validationMessage: data.message, 
                    showMessage: true
                });    
            }

            // ATG:: DECODE TOKEN AND SET APP DATA VIA HOOK FUNCTIONS
            decoded_token = decode(data.token);
            auth.setUserId(decoded_token.user_id);
            auth.setFirstName(decoded_token.first_name);
            auth.setLastName(decoded_token.last_name);
            auth.setEmail(login.email);
            auth.setToken(token);
            auth.setTokenExp(decoded_token.exp);

            this.setState({
                validationMessage: data.message, 
                showMessage: true,
                loginSuccess: true
            });
        })
    }
};


export default Login;