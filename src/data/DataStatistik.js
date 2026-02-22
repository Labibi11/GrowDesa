// data/statistikData.js
export const statistikData = {
  // Data Umum
  jumlahDusun: 8,
  jumlahRW: 16,
  jumlahRT: 12,
  kepalaKeluarga: 542,

  // Data Penduduk
  totalPenduduk: 2026,
  totalLakiLaki: 1090,
  totalPerempuan: 936,

  // Kelompok Usia
  kelompokUsia: [
    { range: 'Balita (0-4 Tahun)', male: 30, female: 39, total: 69 },
    { range: 'Kanak-Kanak (5-11 Tahun)', male: 120, female: 106, total: 226 },
    { range: 'Remaja Awal (12-16 Tahun)', male: 85, female: 105, total: 190 },
    { range: 'Remaja Akhir (17-25 Tahun)', male: 180, female: 198, total: 378 },
    { range: 'Dewasa Awal (26-35 Tahun)', male: 150, female: 183, total: 333 },
    { range: 'Dewasa Akhir (36-45 Tahun)', male: 165, female: 182, total: 347 },
    { range: 'Lansia Awal (46-55 Tahun)', male: 155, female: 197, total: 352 },
    { range: 'Lansia Akhir (56-65 Tahun)', male: 110, female: 165, total: 275 },
    { range: 'Manula (> 65 Tahun)', male: 95, female: 107, total: 202 },
  ],

  // Pekerjaan
  pekerjaan: [
    { label: 'Petani', value: 450, color: '#4CAF50' },
    { label: 'Pedagang', value: 320, color: '#FF9800' },
    { label: 'PNS', value: 180, color: '#2196F3' },
    { label: 'Wiraswasta', value: 280, color: '#9C27B0' },
    { label: 'Buruh', value: 250, color: '#F44336' },
    { label: 'Lainnya', value: 546, color: '#607D8B' },
  ],

  // Pendidikan
  pendidikan: [
    { label: 'Tidak/Belum Sekolah', value: 150, color: '#E91E63' },
    { label: 'SD', value: 420, color: '#9C27B0' },
    { label: 'SMP', value: 380, color: '#3F51B5' },
    { label: 'SMA/SMK', value: 550, color: '#2196F3' },
    { label: 'Diploma', value: 180, color: '#00BCD4' },
    { label: 'Sarjana (S1)', value: 280, color: '#4CAF50' },
    { label: 'Magister (S2)', value: 50, color: '#FF9800' },
    { label: 'Doktor (S3)', value: 16, color: '#F44336' },
  ],

  // Status Ekonomi
  statusEkonomi: [
    { label: 'Sangat Miskin', value: 120, color: '#42A5F5' },
    { label: 'Miskin', value: 340, color: '#5C6BC0' },
    { label: 'Rentan Miskin', value: 250, color: '#26A69A' },
    { label: 'Menengah', value: 420, color: '#FF7043' },
    { label: 'Mampu', value: 180, color: '#78909C' },
    { label: 'Kaya', value: 716, color: '#FFA726' },
  ],

  // Agama
  agama: [
    { label: 'Islam', value: 1950, color: '#4CAF50' },
    { label: 'Kristen', value: 45, color: '#2196F3' },
    { label: 'Katolik', value: 20, color: '#9C27B0' },
    { label: 'Hindu', value: 8, color: '#FF9800' },
    { label: 'Buddha', value: 3, color: '#F44336' },
  ],

  // Status Perkawinan
  statusPerkawinan: [
    { label: 'Belum Kawin', value: 650, color: '#42A5F5' },
    { label: 'Kawin', value: 1200, color: '#4CAF50' },
    { label: 'Cerai Hidup', value: 86, color: '#FF9800' },
    { label: 'Cerai Mati', value: 90, color: '#607D8B' },
  ],

  // Kelahiran & Kematian
  kelahiranKematian: [
    { period: 'Jan - Jun 2023', kelahiran: 23, kematian: 5 },
    { period: 'Jul - Dec 2023', kelahiran: 17, kematian: 7 },
    { period: 'Jan - Jun 2024', kelahiran: 28, kematian: 4 },
    { period: 'Jul - Dec 2024', kelahiran: 20, kematian: 6 },
    { period: 'Jan - Jun 2025', kelahiran: 15, kematian: 3 },
  ],

  // Program Bantuan Sosial
  bantuanSosial: [
    { label: 'PKH (Program Keluarga Harapan)', value: 180, color: '#4CAF50' },
    { label: 'BPNT (Bantuan Pangan Non Tunai)', value: 220, color: '#2196F3' },
    { label: 'BLT (Bantuan Langsung Tunai)', value: 150, color: '#FF9800' },
    { label: 'Kartu Prakerja', value: 95, color: '#9C27B0' },
    { label: 'Subsidi Listrik', value: 310, color: '#00BCD4' },
    { label: 'PIP (Program Indonesia Pintar)', value: 125, color: '#F44336' },
  ],
};

// Helper function untuk mendapatkan mayoritas
export const getMayoritasKelompokUsia = () => {
  const sorted = [...statistikData.kelompokUsia].sort(
    (a, b) => b.total - a.total,
  );
  return sorted[0];
};

export const getMayoritasPekerjaan = () => {
  const sorted = [...statistikData.pekerjaan].sort((a, b) => b.value - a.value);
  return sorted[0];
};

export const getMayoritasPendidikan = () => {
  const sorted = [...statistikData.pendidikan].sort(
    (a, b) => b.value - a.value,
  );
  return sorted[0];
};

export const getMayoritasStatusEkonomi = () => {
  const sorted = [...statistikData.statusEkonomi].sort(
    (a, b) => b.value - a.value,
  );
  return sorted[0];
};

export const getMayoritasAgama = () => {
  const sorted = [...statistikData.agama].sort((a, b) => b.value - a.value);
  return sorted[0];
};

export const getMayoritasStatusPerkawinan = () => {
  const sorted = [...statistikData.statusPerkawinan].sort(
    (a, b) => b.value - a.value,
  );
  return sorted[0];
};

export const getTotalKelahiran = () => {
  return statistikData.kelahiranKematian.reduce(
    (sum, item) => sum + item.kelahiran,
    0,
  );
};

export const getTotalKematian = () => {
  return statistikData.kelahiranKematian.reduce(
    (sum, item) => sum + item.kematian,
    0,
  );
};
