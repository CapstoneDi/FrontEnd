import { useState } from 'react';
import { login } from '../utils/network-data';
import InputLogin from '../components/InputLogin';
import LoadingPage from '../components/Loading';

function LoginPage ({ loginSuccess }){
  const [ isLoading, setLoading ] = useState(false);

  async function onLoginUser({ email, password }) {
    setLoading(true);
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      setLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <>
    <div className="container">
      <p className="title">Selamat Datang Kembali</p>
      <form>
        <InputLogin login={ onLoginUser }/>
      </form>
    </div>
    </>
  );
}

export default LoginPage;