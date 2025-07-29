import React from "react";
import { Link } from "react-router-dom";

class InputRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    if (!this.state.fullName || !this.state.email || !this.state.password || !this.state.confirmPassword) {
      alert('Harap isi semua field.');
      return;
    }

    if (!this.state.email.includes('@')) {
      alert('Email tidak valid.');
      return;
    }
    
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert('Password and password confirm must be same.');
      return;
    }
    
    this.props.register({
      fullname: this.state.fullName,
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return(
      <>
      <div className="form-group">
        <label htmlFor="fullname">Nama Lengkap</label>
        <input 
          type="text"
          id="fullname"
          value={this.state.fullName}
          onChange={(e) => this.setState({fullName: e.target.value})}
          placeholder="Masukan nama lengkap anda" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">email</label>
        <input 
          type="text"
          id="email"
          value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})}          
          placeholder="Masukan email anda" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          id="password"
          value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})}          
          placeholder="Masukan password anda" required />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Konfirmasi Password</label>
        <input 
          type="password"
          id="confirmPassword"
          value={this.state.confirmPassword}
          onChange={(e) => this.setState({confirmPassword: e.target.value})}          
          placeholder="Ulang kata sandi anda" required />
      </div>
      <button className="btn-primary" type="submit" onClick={this.submitHandler}>Register</button>
      <p className="footer-text">Sudah punya akun? <Link to="/">Masuk disini</Link></p>
      </>
    );
  }
}

export default InputRegister;