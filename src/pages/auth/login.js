import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
// import Input from "@material-ui/core/Input"
// import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      // backgroundColor: theme.palette.common.white,
      backgroundColor: `#eaeaea`,
    },
  },
  paper: {
    marginTop: theme.spacing(0),
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    paddingTop: `60px`,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function LogIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const classes = useStyles()

  const validate = e => {
    e.preventDefault()
    console.log("email:", email)
    console.log("password:", password)
  }

  return (
    <Layout>
      <SEO title="Login" />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={{ color: `#000` }}>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => {
                setEmail(e.target.value)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => {
                setPassword(e.target.value)
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={validate}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
      </Container>
    </Layout>
  )
}
