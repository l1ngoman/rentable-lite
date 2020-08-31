import React, { Component } from 'react';                               // https://reactjs.org/docs/getting-started.html
import { Redirect } from 'react-router';                                // https://reactrouter.com/web/api
import { Form, Button, Container, Row, Col } from 'react-bootstrap';    // https://react-bootstrap.github.io/getting-started/introduction
import AuthService from '../helpers/auth_helper';

class Login extends Component
{
    constructor(props){
        super(props);

        this.state = {
            auth: new AuthService(),
            loginSuccess: false,
            showMessage: false,
            validationMessage: '',
            validationMessageStyle: '',
            login: {
                email: '',
                password: ''
            }
        };
    }

    render() {
        let { loginSuccess, showMessage, validationMessage, validationMessageStyle } = this.state;
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
                                <Col xs={10} sm={8} md={5} className={validationMessageStyle}>
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
                {loginSuccess && <Redirect to="/Customers" />}
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
        let { auth, login } = this.state;

        // ATG:: CALL LOGIN FUNCTION
        auth.sign_in(login);

        window.setTimeout(() => {
            if(auth.loggedIn()) {
                this.setState({
                    validationMessage: "Login Success!", 
                    validationMessageStyle: "text-center bg-success", 
                    showMessage: true,
                    loginSuccess: true
                }); 
            } else {
                this.setState({
                    validationMessage: "Authentication Failed.", 
                    validationMessageStyle: "text-center bg-danger", 
                    showMessage: true,
                });
            }
        }, 1000)
    }
};


export default Login;