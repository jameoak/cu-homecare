import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import RouteNavItem from "./components/RouteNavItem";
import Routes from "./Routes";
import "./App.css";
import { authUser, signOutUser } from "./libs/awsLib";
import logo from './CU_HomeCare.png';
import Chart from './components/Chart.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
   signOutUser();
   this.userHasAuthenticated(false);
   this.props.history.push("/login");
  }

  render() {
      const childProps = {
          isAuthenticated: this.state.isAuthenticated,
          userHasAuthenticated: this.userHasAuthenticated
      };
      return (
          !this.state.isAuthenticating &&
          <div className="App container">

            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">CU HomeCare</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  {this.state.isAuthenticated
                    ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                    : [
                        <RouteNavItem key={1} href="/signup">
                          Signup
                        </RouteNavItem>,
                        <RouteNavItem key={2} href="/login">
                          Login
                        </RouteNavItem>
                      ]}
                </Nav>
              </Navbar.Collapse>

            </Navbar>
            <img src={logo} className="logo" alt="logo" height="141" width="211" />
            <Routes childProps={childProps} />
          </div>
      );
}


  async componentDidMount() {
    try {
        if (await authUser()) {
            this.userHasAuthenticated(true);
        }
    }
    catch(e) {
        alert(e);
    }
    this.setState({ isAuthenticating: false });
  }
}
export default withRouter(App);
