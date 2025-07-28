import React, { useState, useEffect } from 'react';
import { addDoctor, getDoctors, editDoctor, deleteDoctor } from '../../utils/network-data';
import listSpecializations from '../../utils/listSpecializations';
import './Admin.css';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    specialization: '',
    alamat:'',
    phone: '',
    status: 'Aktif'
  });
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    async function fetchDoctors() {
      const { data } = await getDoctors();
      // Ubah no_wa menjadi phone
      const mappedDoctors = data.map((doctor) => {
        const date = new Date(doctor.created_at);
        const joinedDate = date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        return {
          ...doctor,
          name: doctor.nama,
          specialization: doctor.spesialis,
          phone: doctor.no_wa,
          status: doctor.status || 'Aktif',
          joinedDate
        };
      });
      setDoctors(mappedDoctors);
    }
    fetchDoctors();
  }, []);

  const specializations = listSpecializations();

  const statusOptions = ['Aktif', 'Pending', 'Nonaktif'];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.phone.includes(searchTerm)
  );

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      id: doctor.id,
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      alamat: doctor.alamat,
      status: doctor.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokter ini?')) {
      await deleteDoctor(id);
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setFormData({
      name: '',
      specialization: '',
      phone: '',
      alamat: '',
      status: 'Aktif'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDoctor(null);
    setFormData({
      name: '',
      specialization: '',
      phone: '',
      alamat: '',
      status: 'Aktif'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name.trim() || !formData.specialization.trim() || !formData.phone.trim()) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }

    const email = 'test@gmail.com';

    if (editingDoctor) {
      // Update existing doctor
      await editDoctor(formData.id, { nama: formData.name, email, spesialis: formData.specialization, noWa: formData.phone, alamat: formData.alamat });
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id 
          ? { ...doctor, ...formData }
          : doctor
      ));
    } else {
      // Add new doctor
      await addDoctor({ nama: formData.name, email, spesialis: formData.specialization, noWa: formData.phone, alamat: formData.alamat }); // nama, email, spesialis, noWa, alamat

      const newDoctor = {
        id: 'doctor-'+Date.now(), // Simple ID generation
        ...formData,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setDoctors([...doctors, newDoctor]);
    }
    
    closeModal();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'aktif':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'nonaktif':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  // const getStatusCount = (status) => {
  //   return doctors.filter(doctor => doctor.status.toLowerCase() === status.toLowerCase()).length;
  // };

  if (!doctors) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="content-header">
          <div className="stats-container">
            <h2 className="content-title">Manajemen Dokter</h2>
            <div className="stat-card">
              <span className="stat-number">{doctors.length}</span>
              <span className="stat-label">Total Dokter</span>
            </div>
            {/* <div className="stat-card">
              <span className="stat-number">{getStatusCount('aktif')}</span>
              <span className="stat-label">Aktif</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{getStatusCount('pending')}</span>
              <span className="stat-label">Pending</span>
            </div> */}
          </div>
        </div>

        <div className="search-add-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Cari dokter berdasarkan nama, spesialisasi, atau nomor telepon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={handleAddDoctor} className="add-doctor-btn">
            <span className="plus-icon">+</span>
            Tambah Dokter Baru
          </button>
        </div>

        <div className="table-container">
          {filteredDoctors.length === 0 ? (
            <div className="no-data">
              <span className="no-data-icon">👨‍⚕️</span>
              <p>Tidak ada dokter yang ditemukan</p>
            </div>
          ) : (
            <table className="doctors-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Nomor</th>
                  <th style={{ textAlign: 'center' }}>Nama</th>
                  <th style={{ textAlign: 'center' }}>Spesialisasi</th>
                  <th style={{ textAlign: 'center' }}>No. Telepon</th>
                  <th style={{ textAlign: 'center' }}>Alamat</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ textAlign: 'center' }}>Bergabung</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor, idx) => (
                  <tr key={doctor.id}>
                    <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                    <td className="doctor-name">{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.alamat}</td>
                    <td>
                      <span 
                        className={`status-badge ${doctor.status.toLowerCase()}`}
                        style={{ backgroundColor: getStatusColor(doctor.status) + '20', color: getStatusColor(doctor.status) }}
                      >
                        {doctor.status}
                      </span>
                    </td>
                    <td>{doctor.joinedDate}</td>
                    <td className="action-buttons">
                      <button
                        onClick={() => handleEdit(doctor)}
                        className="edit-btn"
                        title="Edit dokter"
                      >
                        <span className="edit-icon">✏️</span>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="delete-btn"
                        title="Hapus dokter"
                      >
                        <span className="delete-icon">🗑️</span>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Doctor */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingDoctor ? 'Edit Dokter' : 'Tambah Dokter Baru'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Nama Dokter *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Contoh: dr. Ahmad.Sp.PD"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="specialization">Spesialisasi *</label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih spesialisasi</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Nomor Telepon *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Contoh: 0812332211"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="alamat">Alamat *</label>
                <input
                  type="tel"
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </form>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModal}>Batal</button>
              <button className="save-btn" onClick={handleSubmit}>
                {editingDoctor ? 'Update' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 