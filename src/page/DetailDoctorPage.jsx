import React, {useState, useEffect}from "react";
import { getDoctorsById } from '../utils/network-data';
import { useParams } from "react-router-dom";
import { addCollaborations } from "../utils/network-data";


function DetailDoctorPage() {
  const { id } = useParams();
  const [listAllDoctor, setlistAllDoctor] = useState(
    useEffect(() => {
      async function fetchHistoryDoctor() {
        const { data } = await getDoctorsById(id);
        setlistAllDoctor(data);
      }
      fetchHistoryDoctor();
  }, [id]));

  console.info(listAllDoctor);

  if (!listAllDoctor) {
    return <p>Loading...</p>;
  }

  async function handlerSandMessage(doctorId, nomorWhatsApp) {
    const result = await addCollaborations(doctorId);
    if (!result.error) {
      window.open(`https://wa.me/${nomorWhatsApp.replace(/\D/g, '')}`, "_blank");
    } else {
      alert("Gagal menambahkan kolaborasi");
    }
  }

  return (
    <>
    <div className="doctor-detail">
      <div className="doctor-card-detail">
        <img src="https://img.icons8.com/color/96/doctor-female.png" alt="dr. Clara" />
      </div>
      <div className="info">
        <h2>{listAllDoctor.nama}</h2>
        <p><strong>Spesialis: </strong> {listAllDoctor.spesialis}</p>
        <p><strong>Alamat Praktik: </strong> {listAllDoctor.alamat}</p>
        <p><strong>Email: </strong> {listAllDoctor.email}</p>
        <p><strong>Nomor WhatsApp: </strong> {listAllDoctor.no_wa}</p>
        <button className="whatsapp-btn" type="submit"
          onClick={(e) => {
            e.preventDefault();
            handlerSandMessage(listAllDoctor.id, listAllDoctor.no_wa);
          }}
        >Konsultasi via WhatsApp</button>
      </div>
    </div>
    </>
  );
}

export default DetailDoctorPage;