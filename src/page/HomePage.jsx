import React, {useState, useEffect}from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      {listHistoryDoctor ? (
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
      ) : (<p>Loading...</p>)}
    </motion.div>
  );
}

export default HomePage;