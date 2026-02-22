import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ─── Contoh Data Surat Keterangan Domisili ────────────────────────────────────
const contohSuratDomisili = {
  nomorSurat: 'SKD/001/I/2026',
  jenisSurat: 'Surat Keterangan Domisili',
  tanggalSurat: '25 Januari 2026',
  namaKepala: 'H. BUDI SANTOSO, S.Sos',
  jabatanKepala: 'Kepala Desa Sukamaju',
  nip: '19700515 199203 1 001',
  dataPemohon: {
    nama: 'RRIA',
    nik: '3201012505890001',
    tempatLahir: 'Bogor',
    tanggalLahir: '25 Mei 1989',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: 'Wiraswasta',
    alamat: 'Jl. Melati No. 12 RT 003/RW 005',
    desa: 'Sukamaju',
    kecamatan: 'Cigombong',
    kabupaten: 'Bogor',
    provinsi: 'Jawa Barat',
  },
  keperluan: 'sebagai kelengkapan administrasi pembuatan rekening bank',
};

// ─── Komponen Preview Surat ───────────────────────────────────────────────────
const PreviewSurat = ({ visible, onClose, surat }) => {
  const d = contohSuratDomisili;

  const handleDownloadPDF = () => {
    // Simulasi proses download PDF
    Alert.alert(
      '📥 Download PDF',
      `Surat "${
        surat.nomorSurat
      }" sedang diproses untuk diunduh.\n\nFile: ${surat.nomorSurat.replace(
        /\//g,
        '_',
      )}.pdf\n\nDalam implementasi nyata, gunakan library seperti:\n• react-native-html-to-pdf\n• react-native-pdf-lib\n• expo-print`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'OK, Mengerti',
          style: 'default',
          onPress: () =>
            console.log('Download dikonfirmasi:', surat.nomorSurat),
        },
      ],
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={previewStyles.container}>
        {/* Modal Header */}
        <View style={previewStyles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={previewStyles.closeBtn}>
            <Text style={previewStyles.closeBtnText}>✕ Tutup</Text>
          </TouchableOpacity>
          <Text style={previewStyles.modalTitle}>Preview Surat</Text>
          <TouchableOpacity
            onPress={handleDownloadPDF}
            style={previewStyles.downloadBtn}
          >
            <Text style={previewStyles.downloadBtnText}>⬇ PDF</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={previewStyles.scrollView}
          contentContainerStyle={previewStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Surat Paper */}
          <View style={previewStyles.suratPaper}>
            {/* KOP SURAT */}
            <View style={previewStyles.kop}>
              <View style={previewStyles.kopGardenBorder} />
              <View style={previewStyles.kopContent}>
                <View style={previewStyles.logoPlaceholder}>
                  <Text style={previewStyles.logoText}>🏛️</Text>
                </View>
                <View style={previewStyles.kopText}>
                  <Text style={previewStyles.kopInstansi}>
                    PEMERINTAH KABUPATEN BOGOR
                  </Text>
                  <Text style={previewStyles.kopKecamatan}>
                    KECAMATAN CIGOMBONG
                  </Text>
                  <Text style={previewStyles.kopDesa}>
                    KANTOR KEPALA DESA SUKAMAJU
                  </Text>
                  <Text style={previewStyles.kopAlamat}>
                    Jl. Raya Sukamaju No. 1, Cigombong, Bogor 16740
                  </Text>
                  <Text style={previewStyles.kopAlamat}>
                    Telp. (0251) 8620XXX | Email: desasukamaju@bogor.go.id
                  </Text>
                </View>
              </View>
              <View style={previewStyles.kopGarisTebal} />
              <View style={previewStyles.kopGarisTipis} />
            </View>

            {/* JUDUL SURAT */}
            <View style={previewStyles.judulContainer}>
              <Text style={previewStyles.judulSurat}>
                SURAT KETERANGAN DOMISILI
              </Text>
              <Text style={previewStyles.nomorSurat}>
                Nomor: {d.nomorSurat}
              </Text>
            </View>

            {/* PEMBUKA */}
            <Text style={previewStyles.paragraf}>
              Yang bertanda tangan di bawah ini, Kepala Desa Sukamaju, Kecamatan
              Cigombong, Kabupaten Bogor, Provinsi Jawa Barat, menerangkan
              bahwa:
            </Text>

            {/* DATA PEMOHON */}
            <View style={previewStyles.dataPemohonContainer}>
              {[
                ['Nama Lengkap', d.dataPemohon.nama],
                ['NIK', d.dataPemohon.nik],
                [
                  'Tempat, Tgl. Lahir',
                  `${d.dataPemohon.tempatLahir}, ${d.dataPemohon.tanggalLahir}`,
                ],
                ['Jenis Kelamin', d.dataPemohon.jenisKelamin],
                ['Agama', d.dataPemohon.agama],
                ['Pekerjaan', d.dataPemohon.pekerjaan],
                [
                  'Alamat',
                  `${d.dataPemohon.alamat}, Desa ${d.dataPemohon.desa}, Kec. ${d.dataPemohon.kecamatan}, Kab. ${d.dataPemohon.kabupaten}, ${d.dataPemohon.provinsi}`,
                ],
              ].map(([label, value], idx) => (
                <View key={idx} style={previewStyles.dataRow}>
                  <Text style={previewStyles.dataLabel}>{label}</Text>
                  <Text style={previewStyles.dataSeparator}>:</Text>
                  <Text style={previewStyles.dataValue}>{value}</Text>
                </View>
              ))}
            </View>

            {/* ISI SURAT */}
            <Text style={previewStyles.paragraf}>
              Adalah benar-benar warga yang berdomisili di{' '}
              <Text style={previewStyles.bold}>
                {d.dataPemohon.alamat}, Desa {d.dataPemohon.desa}, Kecamatan{' '}
                {d.dataPemohon.kecamatan}, Kabupaten {d.dataPemohon.kabupaten}
              </Text>{' '}
              dan yang bersangkutan mengajukan Surat Keterangan Domisili ini
              untuk keperluan {d.keperluan}.
            </Text>

            <Text style={previewStyles.paragraf}>
              Demikian Surat Keterangan ini dibuat dengan sebenar-benarnya untuk
              dapat dipergunakan sebagaimana mestinya.
            </Text>

            {/* TANGGAL & TANDA TANGAN */}
            <View style={previewStyles.ttdContainer}>
              <View style={previewStyles.ttdLeft}>
                <Text style={previewStyles.ttdInfo}>Pemohon,</Text>
                <View style={previewStyles.ttdSpace} />
                <Text style={[previewStyles.ttdNama, previewStyles.bold]}>
                  {d.dataPemohon.nama}
                </Text>
              </View>
              <View style={previewStyles.ttdRight}>
                <Text style={previewStyles.ttdInfo}>
                  Sukamaju, {d.tanggalSurat}
                </Text>
                <Text style={previewStyles.ttdJabatan}>
                  Kepala Desa Sukamaju,
                </Text>
                {/* Stempel placeholder */}
                <View style={previewStyles.stempelContainer}>
                  <View style={previewStyles.stempel}>
                    <Text style={previewStyles.stempelText}>
                      STEMPEL{'\n'}DESA
                    </Text>
                  </View>
                </View>
                <Text style={[previewStyles.ttdNama, previewStyles.bold]}>
                  {d.namaKepala}
                </Text>
                <Text style={previewStyles.nip}>NIP: {d.nip}</Text>
              </View>
            </View>
          </View>

          {/* Download Button Bottom */}
          <TouchableOpacity
            style={previewStyles.downloadBtnBottom}
            onPress={handleDownloadPDF}
            activeOpacity={0.8}
          >
            <Text style={previewStyles.downloadBtnBottomIcon}>⬇</Text>
            <Text style={previewStyles.downloadBtnBottomText}>
              Unduh Surat (PDF)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// ─── Komponen Utama BuatSurat ─────────────────────────────────────────────────
const BuatSurat = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('layanan');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);

  const layananSurat = [
    {
      id: '1',
      nama: 'Surat Keterangan Domisili',
      deskripsi: 'Surat keterangan tempat tinggal',
      icon: '🏠',
      addres: 'SuratDomisili',
    },
    {
      id: '2',
      nama: 'Surat Keterangan Usaha',
      deskripsi: 'Surat keterangan usaha/bisnis',
      icon: '💼',
      addres: 'SuratKeteranganUsaha',
    },
    {
      id: '3',
      nama: 'Surat Keterangan Tidak Mampu',
      deskripsi: 'Surat keterangan ekonomi',
      icon: '📄',
      addres: 'SuratKeteranganTidakMampu',
    },
    {
      id: '4',
      nama: 'Surat Keterangan Kehilangan',
      deskripsi: 'Surat Keterangan Kehilangan',
      icon: '🔍',
      addres: 'SuratKeteranganKehilangan',
    },
    {
      id: '5',
      nama: 'Surat Keterangan Kematian',
      deskripsi: 'Surat keterangan kematian',
      icon: '🕊️',
      addres: 'SuratKeteranganKematian',
    },
    {
      id: '6',
      nama: 'Surat Pengantar',
      deskripsi: 'Surat Pengantar',
      icon: '✉️',
      addres: 'SuratPengantar',
    },
  ];

  const riwayatSurat = [
    {
      id: '1',
      jenisSurat: 'Surat Keterangan Domisili',
      tanggal: '25 Jan 2026',
      status: 'Selesai',
      nomorSurat: 'SKD/001/I/2026',
    },
    {
      id: '2',
      jenisSurat: 'Surat Keterangan Usaha',
      tanggal: '20 Jan 2026',
      status: 'Diproses',
      nomorSurat: 'SKU/002/I/2026',
    },
    {
      id: '3',
      jenisSurat: 'Surat Pengantar',
      tanggal: '15 Jan 2026',
      status: 'Selesai',
      nomorSurat: 'SP/003/I/2026',
    },
    {
      id: '4',
      jenisSurat: 'Surat Keterangan Tidak Mampu',
      tanggal: '10 Jan 2026',
      status: 'Ditolak',
      nomorSurat: 'SKTM/004/I/2026',
    },
  ];

  const handleCardPress = item => {
    if (navigation) navigation.navigate(item.addres);
  };

  const handleRiwayatPress = item => {
    if (item.status === 'Selesai') {
      setSelectedSurat(item);
      setPreviewVisible(true);
    } else if (item.status === 'Diproses') {
      Alert.alert(
        '⏳ Sedang Diproses',
        `Surat ${item.nomorSurat} masih dalam proses verifikasi oleh petugas. Harap tunggu notifikasi selanjutnya.`,
        [{ text: 'OK' }],
      );
    } else if (item.status === 'Ditolak') {
      Alert.alert(
        '❌ Surat Ditolak',
        `Surat ${item.nomorSurat} telah ditolak. Silakan hubungi kantor desa untuk informasi lebih lanjut atau ajukan surat baru.`,
        [{ text: 'OK' }],
      );
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Selesai':
        return '#018129';
      case 'Diproses':
        return '#0077BF';
      case 'Ditolak':
        return '#DC3545';
      default:
        return '#666';
    }
  };

  const renderLayananCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardIcon}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nama}</Text>
        <Text style={styles.cardDescription}>{item.deskripsi}</Text>
      </View>
      <View style={styles.cardArrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRiwayatItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.riwayatCard,
        item.status === 'Selesai' && styles.riwayatCardSelesai,
      ]}
      onPress={() => handleRiwayatPress(item)}
      activeOpacity={0.75}
    >
      <View style={styles.riwayatHeader}>
        <Text style={styles.riwayatJenis} numberOfLines={1}>
          {item.jenisSurat}
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.riwayatNomor}>{item.nomorSurat}</Text>
      <View style={styles.riwayatFooter}>
        <Text style={styles.riwayatTanggal}>📅 {item.tanggal}</Text>
        {item.status === 'Selesai' && (
          <View style={styles.actionHint}>
            <Text style={styles.actionHintText}>👁 Preview · ⬇ Unduh</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Persuratan</Text>
        <Text style={styles.headerSubtitle}>
          Layanan administrasi desa digital
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'layanan' && styles.activeTab]}
          onPress={() => setActiveTab('layanan')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'layanan' && styles.activeTabText,
            ]}
          >
            Layanan Persuratan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'riwayat' && styles.activeTab]}
          onPress={() => setActiveTab('riwayat')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'riwayat' && styles.activeTabText,
            ]}
          >
            Riwayat Surat
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Banner untuk Riwayat */}
      {activeTab === 'riwayat' && (
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>
            💡 Ketuk surat berstatus{' '}
            <Text style={{ fontWeight: '700', color: '#018129' }}>Selesai</Text>{' '}
            untuk preview dan unduh PDF
          </Text>
        </View>
      )}

      {/* Content */}
      {activeTab === 'layanan' ? (
        <FlatList
          data={layananSurat}
          renderItem={renderLayananCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={riwayatSurat}
          renderItem={renderRiwayatItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>Belum ada riwayat surat</Text>
            </View>
          }
        />
      )}

      {/* Modal Preview Surat */}
      <PreviewSurat
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        surat={selectedSurat}
      />
    </SafeAreaView>
  );
};

// ─── Styles Utama ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f0' },
  header: {
    backgroundColor: '#018129',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 24,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: 'white' },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: '#018129' },
  tabText: { fontSize: 15, fontWeight: '600', color: '#999' },
  activeTabText: { color: '#018129' },
  infoBanner: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C8E6C9',
  },
  infoBannerText: { fontSize: 13, color: '#2e7d32' },
  listContent: { padding: 15, paddingBottom: 30 },
  // Card Layanan
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#018129',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconText: { fontSize: 24 },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  cardDescription: { fontSize: 12, color: '#888' },
  cardArrow: { marginLeft: 8 },
  arrowText: { fontSize: 26, color: '#ccc' },
  // Riwayat
  riwayatCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  riwayatCardSelesai: {
    borderLeftColor: '#018129',
    shadowColor: '#018129',
    shadowOpacity: 0.12,
  },
  riwayatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  riwayatJenis: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: 'white', fontSize: 13, fontWeight: '700' },
  riwayatNomor: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  riwayatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riwayatTanggal: { fontSize: 12, color: '#999' },
  actionHint: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  actionHintText: { fontSize: 11, color: '#018129', fontWeight: '600' },
  // Empty
  emptyContainer: { flex: 1, alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#bbb' },
});

// ─── Styles Preview Modal ─────────────────────────────────────────────────────
const previewStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8ede8' },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#018129',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  closeBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  closeBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  modalTitle: { color: 'white', fontWeight: '800', fontSize: 16 },
  downloadBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  downloadBtnText: { color: '#018129', fontWeight: '800', fontSize: 14 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Kertas Surat
  suratPaper: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
  },

  // Kop
  kop: { marginBottom: 16 },
  kopGardenBorder: {
    height: 6,
    backgroundColor: '#018129',
    marginBottom: 12,
    borderRadius: 2,
  },
  kopContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  logoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#018129',
  },
  logoText: { fontSize: 28 },
  kopText: { flex: 1 },
  kopInstansi: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  kopKecamatan: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginTop: 1,
  },
  kopDesa: {
    fontSize: 14,
    fontWeight: '900',
    color: '#018129',
    textAlign: 'center',
    marginTop: 2,
  },
  kopAlamat: { fontSize: 9, color: '#666', textAlign: 'center', marginTop: 1 },
  kopGarisTebal: { height: 3, backgroundColor: '#018129', marginTop: 8 },
  kopGarisTipis: { height: 1, backgroundColor: '#018129', marginTop: 2 },

  // Judul
  judulContainer: { alignItems: 'center', marginVertical: 16 },
  judulSurat: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  nomorSurat: { fontSize: 13, color: '#444', marginTop: 4 },

  // Isi
  paragraf: {
    fontSize: 12,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'justify',
  },
  bold: { fontWeight: '700' },

  // Data Pemohon
  dataPemohonContainer: {
    backgroundColor: '#f9fdf9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e0ece0',
  },
  dataRow: { flexDirection: 'row', marginBottom: 6 },
  dataLabel: { fontSize: 11, color: '#555', width: 110, fontWeight: '600' },
  dataSeparator: { fontSize: 11, color: '#555', marginHorizontal: 6 },
  dataValue: { fontSize: 11, color: '#222', flex: 1, fontWeight: '500' },

  // TTD
  ttdContainer: { flexDirection: 'row', marginTop: 20 },
  ttdLeft: { flex: 1, alignItems: 'center' },
  ttdRight: { flex: 1, alignItems: 'center' },
  ttdInfo: { fontSize: 11, color: '#333', marginBottom: 4, fontWeight: '600' },
  ttdJabatan: { fontSize: 11, color: '#333', marginBottom: 6 },
  ttdSpace: { height: 60 },
  ttdNama: { fontSize: 12, color: '#111', textDecorationLine: 'underline' },
  nip: { fontSize: 10, color: '#555', marginTop: 2 },
  stempelContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stempel: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2.5,
    borderColor: '#0055AA',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,85,170,0.04)',
  },
  stempelText: {
    fontSize: 9,
    color: '#0055AA',
    textAlign: 'center',
    fontWeight: '700',
  },

  // Bottom Download
  downloadBtnBottom: {
    flexDirection: 'row',
    backgroundColor: '#018129',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#018129',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  downloadBtnBottomIcon: { fontSize: 20, marginRight: 10, color: 'white' },
  downloadBtnBottomText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 0.5,
  },
});

export default BuatSurat;
