import React, { useState, useContext } from 'react';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';
import './login-style.css'
import { userContext } from '../../App'

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

const Login = () => {

    // const { register, errors, getValues, handleSubmit } = useForm()

    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
        success: false,

    })
    // console.log(user.email, user.password)

    // const onSubmit = (data) => {
    //     setUser(data)
    // };

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'firstName') {
            isFormValid = e.target.value.length > 4
            //  console.log(isFormValid);
        }
        if (e.target.name === 'lastName') {
            isFormValid = e.target.value.length > 4
            //  console.log(isFormValid);
        }

        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
            //   console.log(isFormValid);
        }


        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordContainNumber = /\d{1}/.test(e.target.value)
            isFormValid = isPasswordValid && passwordContainNumber
            //   console.log(isPasswordValid, passwordContainNumber)
        }


        if (isFormValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
            //   console.log(e.target.value)

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    updateUserName(user.firstName, user.lastName)
                    setUser(newUserInfo)
                })

                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false
                    setUser(newUserInfo)
                });
        }

        if (!newUser && user.email && user.password) {
            // console.log(user.email, user.password)
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)

                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    setLoggedInUser(newUserInfo)
                    history.replace(from)
                    // console.log('sign in user info', res.user)
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false
                    setUser(newUserInfo)

                });
        }


    }

    const updateUserName = (firstName, lastName) => {

        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: firstName + ' ' + lastName,
        }).then(res => {
            console.log('update name successfully!');
        }).catch(error => {
            console.log(error.message);
        });
    }


    var googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                // console.log(result)
                const { displayName, email } = result.user;

                const userInfo = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                }
                setUser(userInfo)
                setLoggedInUser(userInfo)
                history.replace(from)
            })
            .catch(error => {

                var error = error.message;
                console.log(error);
            });
    }

    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    const handleFacebookSignIn = () => {
        firebase.auth().signInWithPopup(facebookProvider)
            .then(result => {
                const { displayName, email } = result.user;
                const userInfo = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                }
                setUser(userInfo)
                setLoggedInUser(userInfo)
                history.replace(from)

            }).catch(error => {

                var errorMessage = error.message;
                console.log(errorMessage)
            });
    }


    return (
        <Container>
            <Row className="marginTop">
                <Col md={6} className="mx-auto">
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {
                        user.success && <p style={{ color: 'green' }}>{newUser ? 'SignUp' : 'SingnIn'} successfully done.</p>
                    }
                    <div className="signInSignUp__section p-3 ">
                        <form className="form-group" onSubmit={handleSubmit}>
                            {newUser && <label htmlFor="firstName" className="label">First Name</label>}
                            {newUser && <input onBlur={handleBlur} type="text" name="firstName" placeholder="Enter First Name" className="form-control" />}
                            {newUser && <label htmlFor="lastName" className="label">Last Name</label>}
                            {newUser && <input onBlur={handleBlur} type="text" name="lastName" placeholder="Enter Last Name" className="form-control" />}
                            {/* {newUser  && <small className="text-danger">Name is required</small>}<br /> */}
                            <label htmlFor="email" className="label">Email</label>
                            <input onBlur={handleBlur} type="email" name="email" placeholder="Enter Email" className="form-control" />
                            {/* {!user.email  && <small className="text-danger">Email is required</small>}<br /> */}
                            <label htmlFor="password" className="label">Password</label>
                            <input onBlur={handleBlur} type="password" name="password" placeholder="Enter password" className="form-control" />
                            {/* {!user.password && <small className="text-danger">Password is required</small>}<br /> */}
                            {/* {newUser && <label htmlFor="confirmPassword" className="label">Confirm Password</label>}
                            {newUser &&  <input onBlur={handleBlur} type="password" name="confirmPassword" placeholder="Confirm Password "className="form-control" />} */}
                            {
                                newUser ? <button className="signin-btn my-3">Sign Up</button> : <button className="signin-btn my-3">SignIn</button>
                            }

                        </form>
                        <p className="text-center">{!newUser ? `Don't have an account?` : 'Have an account?'} <span className="create-ac" onClick={() => setNewUser(!newUser)}>{!newUser ? 'Create an account' : 'Sign In'}</span></p>
                    </div>


                    <div className="social__signUp ">
                        <p className="text-center">Or</p>
                        <div className="googleSignIn mx-auto" onClick={handleGoogleSignIn}>
                            <FontAwesomeIcon className="googleSignInIcon" icon={faGoogle} />Continue with Google
                        </div>
                        <div className="googleSignIn mx-auto mt-2" onClick={handleFacebookSignIn}>
                            <FontAwesomeIcon className="facebookSignInIcon" icon={faFacebook} />Continue with Facebook
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;