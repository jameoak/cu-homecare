import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Login.css";
import {
 CognitoUserPool,
 AuthenticationDetails,
 CognitoUser
} from "amazon-cognito-identity-js";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: "",
            password: ""
        };
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            await this.login(this.state.username, this.state.password);
            this.props.userHasAuthenticated(true);  // set state
            //this.props.setUsername(this.state.username);
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
            </FormGroup>
            <LoaderButton
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Login"
                loadingText="Logging in…"
            />
          </form>
        </div>
        );
    }

    // LOGIN METHOD
    login(username, password) {
      const userPool = new CognitoUserPool({
        UserPoolId: config.cognito.USER_POOL_ID,
        ClientId: config.cognito.APP_CLIENT_ID
      });
      console.log("test");
      console.log(username);
      console.log(password);
      const user = new CognitoUser({ Username: username, Pool: userPool });
      const authenticationData = { Username: username, Password: password };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
      );
    }

}
