import React, {useState, useEffect}from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-chat-doctors">
        <ListAllDoctors listDoctor={listAllDoctor} listSpecialists={listSpecialists}/>
      </div>
    </motion.div>
  );
}

export default ChatDoctorsPage;