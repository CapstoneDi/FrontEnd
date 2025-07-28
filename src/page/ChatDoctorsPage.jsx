import React, {useState, useEffect}from "react";
import { getDoctors } from '../utils/network-data';
import ListAllDoctors from "../components/ListAllDoctors";

function ChatDoctorsPage() {
  const [listAllDoctor, setlistAllDoctor] = useState(
  useEffect(() => {
    async function fetchHistoryDoctor() {
      const { data } = await getDoctors();
      setlistAllDoctor(data);
    }
    fetchHistoryDoctor();
  }, []));

  const listSpecialists = Array.isArray(listAllDoctor)
    ? [...new Set(listAllDoctor.map(doctor => doctor.spesialis))]
    : [];

  if (!listAllDoctor)
    return (<p>Loading...</p>);

  return (
      <>
      <div className="container-chat-doctors">
        <ListAllDoctors listDoctor={listAllDoctor} listSpecialists={listSpecialists}/>
      </div>
      </>
  );
}

export default ChatDoctorsPage;