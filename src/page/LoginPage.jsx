import { login } from '../utils/network-data';
import InputLogin from '../components/InputLogin';

function LoginPage ({ loginSuccess }){

  async function onLoginUser({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
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