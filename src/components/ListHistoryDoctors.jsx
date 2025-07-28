import React from "react";


class ListDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: props.listDoctor || [],
      userId: props.userId || null
    };

    this.handleDetailDoctorClick = this.handleDetailDoctorClick.bind(this);
  }

  handleDetailDoctorClick(id) {
    if (this.props.history) {
      this.props.history.push(`/doctor/${id}`);
    } else if (window && window.location) {
      window.location.href = `/doctor/${id}`;
    }
  }

  render() {
    return (
      <>
      <div className="doctor-list">
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

export default ListDoctors;