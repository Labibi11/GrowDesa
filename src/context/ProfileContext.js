import React, { createContext, useState, useContext } from 'react';

// Create Context
const ProfileContext = createContext();

// Custom Hook untuk menggunakan ProfileContext
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};

// Provider Component
export const ProfileProvider = ({ children }) => {
  // Data untuk tampilan profile (data basic)
  const [profileData, setProfileData] = useState({
    nama: 'Maudy Aprila Ahmad',
    noTelp: '1222222',
    alamat: 'Tomakoreo',
    nik: '!!!!!!!!!',
    jenisKelamin: 'Perempuan',
    profileImage: require('../assets/icon_profile.png'), // Local image
  });

  // Data lengkap untuk CompleteData (proses verifikasi/validasi)
  const [completeData, setCompleteData] = useState({
    nik: 'tyu',
    nama: 'tyu',
    tempatLahir: 'tyu',
    tanggalLahir: 'tyu',
    jenisKelamin: 'tyu',
    alamat: 'tyu',
    pekerjaan: 'tyu',
    agama: 'tyu',
    fotoSelfie: require('../assets/icon_profile.png'),
    fotoKTP: require('../assets/icon_profile.png'),
    isCompleted: false, // Flag untuk cek apakah data sudah lengkap
  });

  // Data yang digunakan untuk form surat (data lengkap untuk dokumen)
  const [userData, setUserData] = useState({
    namaLengkap: 'asd',
    nik: 'asd',
    jenisKelamin: 'asd',
    tempatLahir: 'asd',
    tanggalLahir: 'asd',
    pekerjaan: 'asd',
    agama: 'asd',
    alamat: 'asd',
    statusPerkawinan: 'asd',
  });

  // Function untuk update profile basic
  const updateProfile = newData => {
    setProfileData(prevData => ({
      ...prevData,
      ...newData,
    }));
  };

  // Function untuk update complete data (verifikasi)
  const updateCompleteData = newData => {
    setCompleteData(prevData => ({
      ...prevData,
      ...newData,
    }));
  };

  // Function untuk update user data (data surat)
  const updateUserData = (field, value) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to update multiple fields at once
  const updateMultipleFields = fields => {
    setUserData(prevData => ({
      ...prevData,
      ...fields,
    }));
  };

  // Function untuk sinkronisasi data dari profileData ke userData
  const syncProfileToUserData = () => {
    setUserData(prevData => ({
      ...prevData,
      namaLengkap: profileData.nama,
      nik: profileData.nik,
      jenisKelamin: profileData.jenisKelamin,
      alamat: profileData.alamat,
    }));
  };

  // Function untuk sinkronisasi data dari completeData ke userData
  const syncCompleteToUserData = () => {
    setUserData({
      namaLengkap: completeData.nama,
      nik: completeData.nik,
      jenisKelamin: completeData.jenisKelamin,
      tempatLahir: completeData.tempatLahir,
      tanggalLahir: completeData.tanggalLahir,
      pekerjaan: completeData.pekerjaan,
      agama: completeData.agama,
      alamat: completeData.alamat,
      statusPerkawinan: '', // Ini bisa ditambahkan di completeData jika perlu
    });
  };

  // Function to get TTL format (Tempat, Tanggal Lahir)
  const getTTL = () => {
    if (userData.tempatLahir && userData.tanggalLahir) {
      return `${userData.tempatLahir}, ${userData.tanggalLahir}`;
    }
    return '';
  };

  // Function untuk cek apakah data sudah lengkap
  const checkDataComplete = () => {
    return (
      completeData.nik !== '' &&
      completeData.nama !== '' &&
      completeData.tempatLahir !== '' &&
      completeData.tanggalLahir !== '' &&
      completeData.jenisKelamin !== '' &&
      completeData.alamat !== '' &&
      completeData.pekerjaan !== '' &&
      completeData.agama !== '' &&
      completeData.fotoSelfie !== null &&
      completeData.fotoKTP !== null
    );
  };

  // Function untuk cek apakah userData sudah lengkap untuk form surat
  const checkUserDataComplete = () => {
    return (
      userData.namaLengkap !== '' &&
      userData.nik !== '' &&
      userData.jenisKelamin !== '' &&
      userData.tempatLahir !== '' &&
      userData.tanggalLahir !== ''
    );
  };

  // Function to clear userData
  const clearUserData = () => {
    setUserData({
      namaLengkap: '',
      nik: '',
      jenisKelamin: '',
      tempatLahir: '',
      tanggalLahir: '',
      pekerjaan: '',
      agama: '',
      alamat: '',
      statusPerkawinan: '',
    });
  };

  // Function untuk reset profile
  const resetProfile = () => {
    setProfileData({
      nama: '',
      noTelp: '',
      alamat: '',
      nik: '',
      jenisKelamin: '',
      profileImage: require('../assets/icon_profile.png'),
    });
  };

  // Function untuk reset complete data
  const resetCompleteData = () => {
    setCompleteData({
      nik: '',
      nama: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: '',
      alamat: '',
      pekerjaan: '',
      agama: '',
      fotoSelfie: null,
      fotoKTP: null,
      isCompleted: false,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        // Profile Data
        profileData,
        updateProfile,
        resetProfile,

        // Complete Data (Verifikasi)
        completeData,
        updateCompleteData,
        checkDataComplete,
        resetCompleteData,

        // User Data (Form Surat)
        userData,
        updateUserData,
        updateMultipleFields,
        getTTL,
        clearUserData,
        checkUserDataComplete,

        // Sync Functions
        syncProfileToUserData,
        syncCompleteToUserData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
