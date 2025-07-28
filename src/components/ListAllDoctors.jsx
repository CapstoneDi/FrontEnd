import React from "react";
import { addCollaborations } from "../utils/network-data";

class ListAllDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: props.listDoctor || [],
      listAllDoctor: props.listDoctor || [],
      listSpecialists: props.listSpecialists || [],
      selectedSpecialist: ''
    };

    this.handleDoctorClick = this.handleDoctorClick.bind(this);
    this.handleDetailDoctorClick = this.handleDetailDoctorClick.bind(this);
    this.onSpecialistChange = this.onSpecialistChange.bind(this);
  }

  async handleDoctorClick(id) {
    await addCollaborations(id);
  }

  handleDetailDoctorClick(id) {
    if (this.props.history) {
      this.props.history.push(`/doctor/${id}`);
    } else if (window && window.location) {
      window.location.href = `/doctor/${id}`;
    }
  }

  onSpecialistChange(e) {
    const selected = e.target.value;

    this.setState({ selectedSpecialist: selected });

    const filteredDoctors =
      selected === '' || selected === 'Semua Spesialis'
        ? this.state.listAllDoctor
        : this.state.listAllDoctor.filter((doc) => doc.spesialis === selected);

    this.setState({ listDoctor: filteredDoctors });
  }

  render() {
    return (
      <>
      <h1 style={{ textAlign: "center" }}>Daftar Semua Dokter</h1>
      <label htmlFor="specialist-select" style={{ marginRight: "10px", marginTop: "10px" }}>Pilih Spesialis:</label>
      <select id="specialist-select" style={{ marginTop: "10px" }} onChange={this.onSpecialistChange}>
        <option value="">Semua Spesialis</option>
        {this.state.listSpecialists.map((specialist, index) => (
          <option key={index} value={specialist}>{specialist}</option>
        ))}
      </select>
      <div className="doctor-grid" id="doctorList">
        {this.state.listDoctor.length > 0 ? (
          this.state.listDoctor.map((doctor, index) => (
            <div key={index} className="doctor-card" onClick={() => this.handleDetailDoctorClick(doctor.id)}>
              <img src={`https://img.icons8.com/color/96/doctor-male.png`} alt={doctor.nama} className="doctor-icon"/>
              <h2 className="doctor-name">{doctor.nama}</h2>
              <p><strong>Spesialis: </strong>{doctor.spesialis}</p>
              <p><strong>Alamat: </strong>{doctor.alamat}</p>
              <a
                className="whatsapp-btn"
                href={`https://wa.me/${doctor.no_wa.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => {
                  e.stopPropagation();
                  this.handleDoctorClick(doctor.id);
                }}
              >Pesan via WhatsApp</a>
              </div>
          ))
        ) : (
          <p>No doctors available at the moment.</p>
        )}
      </div>
      </>
    );
  }
}

export default ListAllDoctors;