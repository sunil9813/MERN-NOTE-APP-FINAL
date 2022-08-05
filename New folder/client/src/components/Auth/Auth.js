import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { GoogleLogin } from "react-google-login"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { gapi } from "gapi-script"

import Icon from "./icon"
import { signin, signup } from "../../actions/auth"
import { AUTH } from "../../constants/actionTypes"
import useStyles from "./styles"
import Input from "./Input"

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

const SignUp = () => {
  const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  const REACT_PUBLIC_GOOGLE_CLIENT_ID = "558650932585-uqqc9ogvl1evspf79mmrbiu2u9tdqn11.apps.googleusercontent.com"
  var API_KEY = "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"

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        apiKey: API_KEY,
        //scope: "email",
      })
    }
    gapi.load("client:auth2", start)
  }, [])

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: "AUTH", data: { result, token } })
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (err) => {
    console.log(err)
    console.log("Google sign in was unsuccessful. Try Agian ")
  }
  /* ------------ google login---------- */

  const switchMode = () => {
    setForm(initialState)
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      dispatch(signup(form, history))
    } else {
      dispatch(signin(form, history))
    }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
              </>
            )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId={REACT_PUBLIC_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button className={classes.googleButton} fullWidth color='primary' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default SignUp
