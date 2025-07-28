import React, {useState, useEffect}from "react";
import ListHistoryDoctors from "../components/ListHistoryDoctors";
import { getHistoryDoctors } from '../utils/network-data';

function HomePage() {

  const [listHistoryDoctor, setlistHistoryDoctor] = useState(
    useEffect(() => {
      async function fetchHistoryDoctor() {
        const { data } = await getHistoryDoctors();
        setlistHistoryDoctor(data);
      }
      fetchHistoryDoctor();
  }, []));

  if (!listHistoryDoctor)
    return (<p>Loading...</p>);

  return (
    <>
    <section className="hero">
      <div className="hero-text">
        <h1>KONSULTASI DOKTER<br />KAPAN SAJA, TANPA ANTRI!</h1>
      </div>
      <img src="src/assets/asset-01.png" alt="Doctors Illustration" />
    </section>

    <div className="container-doctor">
      <h2>Riwayat Percakapan</h2>
      <ListHistoryDoctors listDoctor={listHistoryDoctor} />
    </div>
    </>
  );
}

export default HomePage;