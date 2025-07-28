import { getUserLogged, putAccessToken } from './utils/network-data';
import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import HomePage from './page/HomePage';
import DetailDoctorPage from './page/DetailDoctorPage';
import ChatDoctorsPage from './page/ChatDoctorsPage';
import BMICalculator from './page/cek-ideal-badan/BMICalculator';
import Admin from './page/Admin/Admin';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authedUser: null,
      initializing: true
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    if (!localStorage.getItem('accessToken')) {
      this.setState(() => {
        return {
          authedUser: null,
          initializing: false
        };
      });
      return;
    }
    
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
    window.location.href = '/';
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser !== null && this.state.authedUser.user.id === 'admin') {
      return (
        <>
        <header>
          <div className="logo">Jaga Sehat</div>
          <nav className="nav-links">
            <button onClick={this.onLogout} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvZy1vdXQtaWNvbiBsdWNpZGUtbG9nLW91dCI+PHBhdGggZD0ibTE2IDE3IDUtNS01LTUiLz48cGF0aCBkPSJNMjEgMTJIOSIvPjxwYXRoIGQ9Ik05IDIxSDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNCIvPjwvc3ZnPg=="
              alt="Profile Icon"
            />
            </button>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Admin />} />
            <Route path="/*" element={<p>404 | Not found</p>} />
          </Routes>
        </main>
        </>
      );
    }

    return (
      <>
      <header className="navbar">
        {this.state.authedUser ? (
          <>
          <div className="logo">Jaga Sehat</div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/ChatDoctors">Pesan dengan Dokter</Link>
            <Link to="/CheckIdeal">Cek Badan Ideal</Link>
            <button onClick={this.onLogout} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvZy1vdXQtaWNvbiBsdWNpZGUtbG9nLW91dCI+PHBhdGggZD0ibTE2IDE3IDUtNS01LTUiLz48cGF0aCBkPSJNMjEgMTJIOSIvPjxwYXRoIGQ9Ik05IDIxSDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNCIvPjwvc3ZnPg=="
              alt="Profile Icon"
            />
            </button>
          </nav>
          </>
        ) : (
          <>
          <div className="logo">Jaga Sehat</div>
          <nav>
            <Link to="/" className="active">Masuk</Link>
            <Link to="/register">Daftar</Link>
          </nav>
          </>
        )}
      </header>
      <main>
        <Routes>
          {this.state.authedUser ? (
            <>
            <Route path='/' element={<HomePage />} />
            <Route path="/ChatDoctors" element={<ChatDoctorsPage />} />
            <Route path="/CheckIdeal" element={<BMICalculator />} />
            <Route path="/doctor/:id" element={<DetailDoctorPage />} />
            <Route path="/*" element={<p>404 | Not found</p>} />
            </>
          ) : (
            <>
            <Route path="/" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<p>404 | Not found</p>} />
            </>
          )} 
        </Routes>
      </main>
      </>
    )
  }
}

export default App
