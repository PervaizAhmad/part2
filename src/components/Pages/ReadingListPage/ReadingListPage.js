import React from "react";
import Login from "../../Login/Login";
import Logout from "../../Logout/Logout";
import ReadingList from "../../ReadingList/ReadingList";

class ReadingListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: "",
      password: "",
      token: null
    }

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('loginToken')) {
      this.setState({ authenticated: true, token: localStorage.getItem('loginToken') });
    }
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  handleLoginClick = () => {
    let url = "http://unn-w18014333.newnumyspace.co.uk/kf6012/coursework/part1/api/authenticate"

    // Send the email and password as 'Form Data'.
    let formData = new FormData();
    formData.append('username', this.state.email);
    formData.append('password', this.state.password);

    // A fetch request with 'POST' method specified
    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        // Successful authentication will return
        // a 200 status code.
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        // If results include a token, change state
        // to authenticated
        if ("token" in data.results) {
          localStorage.setItem('loginToken', data.results.token)
          this.setState({ authenticated: true, token: localStorage.getItem('loginToken') })
        }
      })
      .catch((err) => {
        console.log("something went wrong ", err)
      }
      );
  }

  handleLogoutClick = () => {
    this.setState({ authenticated: false, token: null })
    localStorage.removeItem('loginToken')
  }

  render() {

    let page = (
      <Login
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleLoginClick={this.handleLoginClick}
      />
    )
    if (this.state.authenticated) {
      page = (
        <div>
          <Logout handleLogoutClick={this.handleLogoutClick} />
          <ReadingList token={this.state.token} />
        </div>
      )
    }

    return (
      <div>{page}</div>
    )
  }
}

export default ReadingListPage;