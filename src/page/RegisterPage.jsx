import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../utils/network-data';
import InputRegister from '../components/InputRegister';

function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setLoading] = useState(false);

  async function onRegisterUser(user) {
    console.log('API BASE URL:', import.meta.env.VITE_API_BASE_URL);
    alert('API BASE URL:', import.meta.env.VITE_API_BASE_URL);
    setLoading(true);
    const { error } = await register(user);
    setLoading(false);

    if (!error) {
      navigate('/');
    } else {
      setErrorMessage("Pendaftaran gagal. Silakan coba lagi.");
      console.error(errorMessage);
    }
  }

  if (isloading) {
      return <p>sedang proses pembuatan akun...</p>;
  }
  return (
    <>
    <div className="container">
      <p className="title">Bergabung dengan Kami</p>
      <form>
        <InputRegister register={onRegisterUser}/>
      </form>
    </div>
    </>
  );
}

export default RegisterPage;