import React from "react";
import { Link } from "react-router-dom";

class InputLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    if (!this.state.email || !this.state.password) {
      alert('Harap masukan email atau password.');
      return;
    }

    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <>
      <div className="form-group">
        <label htmlFor="email">email</label>
        <input 
          type="text"
          id="email"
          value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})}
          placeholder="Enter your email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          id="password"
          value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})}
          placeholder="Enter your password" required />
      </div>
      <button className="btn-primary" type="submit" onClick={this.submitHandler}>Login</button>
      <p className="footer-text">Tidak punya akun? <Link to="/register">Daftar disini</Link></p>
      </>
    );
  }
}

export default InputLogin;