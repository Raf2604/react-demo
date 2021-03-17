import React, {useState} from "react";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styles from './stylesLogin.module.css';
import {Link} from 'react-router-dom';

function Login(){
    const [values, setValues] = useState({
        email:'',
        password:''
        
    })
    const [errors, setErrors] = useState({
        email:null,
        password:null
    })


    const handleChange = ({target:{name,value}})=>{
        setErrors({
            ...errors,
            [name]: null
        })

        setValues({
            ...values,
            [name]: value
        })
    }

    const disableSpace = (event)=>{
        if(event.charCode === 32){
            event.preventDefault();
        }
    }

    const handleSubmit = ()=>{
        const {email, password} = values;
        let valid = true;

        let emailMessage = null;
        if(email){
            const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!reg.test(email)){
                emailMessage = 'Invalid email';
                valid = false;
            }
        }else{
            emailMessage = 'Email is required';
            valid = false;
        }

        let passwordMessage = null;
        if(!password){
            passwordMessage = 'Password is required';
            valid = false;
        }

        setErrors({
            email: emailMessage,
            password: passwordMessage
        })

        if(valid){
            console.log(values);
        }
    }

    return(
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <h2>Login</h2>

                    <Form.Group>
                        <Form.Control 
                        className={errors.email ? styles.errorBorder: ""}
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={values.email}
                        onChange={handleChange}
                        onKeyPress={disableSpace}
                        />
                        <Form.Text className="text-danger">
                            {errors.email}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        className={errors.password ? styles.errorBorder: ""}
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onKeyPress={disableSpace}
                        />
                        <Form.Text className="text-danger">
                            {errors.password}
                        </Form.Text>
                    </Form.Group>

                    <Button
                        className={`${styles.loginBtn}`}
                        variant="primary"
                        onClick={handleSubmit}
                    >
                    Login
                    </Button>

                    <Link className={`${styles.link}`} to='/register'>Don't have an account? Sign up here!</Link>
                </Col>
            </Row>
        </Container>
    )
}
export default Login;