import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useProfile } from '../context/ProfileContext';

const SuratKeteranganMiskin = ({ navigation }) => {
  const { userData, getTTL, checkUserDataComplete } = useProfile();

  // State untuk field spesifik form ini
  const [penghasilanPerBulan, setPenghasilanPerBulan] = useState('');
  const [jumlahTanggungan, setJumlahTanggungan] = useState('');
  const [kondisiRumah, setKondisiRumah] = useState('');
  const [statusKepemilikanRumah, setStatusKepemilikanRumah] = useState('');
  const [kondisiEkonomi, setKondisiEkonomi] = useState('');
  const [keperluan, setKeperluan] = useState('');

  // Check jika data user belum lengkap saat component mount
  useEffect(() => {
    if (!checkUserDataComplete()) {
      Alert.alert(
        'Data Belum Lengkap',
        'Silakan lengkapi data pribadi Anda terlebih dahulu di halaman Profile.',
        [
          {
            text: 'Lengkapi Sekarang',
            onPress: () => navigation.navigate('CompleteData'),
          },
          {
            text: 'Nanti',
            style: 'cancel',
          },
        ],
      );
    }
  }, []);

  const handleSubmit = () => {
    // Validasi field spesifik form
    if (
      !penghasilanPerBulan ||
      !jumlahTanggungan ||
      !kondisiRumah ||
      !statusKepemilikanRumah ||
      !kondisiEkonomi ||
      !keperluan
    ) {
      Alert.alert('Peringatan', 'Harap lengkapi semua field yang diperlukan');
      return;
    }

    // Validasi jumlah tanggungan (harus angka)
    if (isNaN(jumlahTanggungan) || jumlahTanggungan < 0) {
      Alert.alert('Peringatan', 'Jumlah tanggungan harus berupa angka');
      return;
    }

    // Validasi data user
    if (!checkUserDataComplete()) {
      Alert.alert(
        'Data Belum Lengkap',
        'Silakan lengkapi data pribadi Anda terlebih dahulu.',
        [
          {
            text: 'Lengkapi Sekarang',
            onPress: () => navigation.navigate('CompleteData'),
          },
          {
            text: 'Batal',
            style: 'cancel',
          },
        ],
      );
      return;
    }

    const formData = {
      // Data dari Context
      nik: userData.nik,
      namaLengkap: userData.namaLengkap,
      jenisKelamin: userData.jenisKelamin,
      ttl: getTTL(),
      pekerjaan: userData.pekerjaan,
      agama: userData.agama,
      alamat: userData.alamat,
      statusPerkawinan: userData.statusPerkawinan,
      // Data spesifik form
      penghasilanPerBulan,
      jumlahTanggungan: parseInt(jumlahTanggungan),
      kondisiRumah,
      statusKepemilikanRumah,
      kondisiEkonomi,
      keperluan,
    };

    console.log('Form Data:', formData);

    // TODO: Add your submit logic here (API call, navigation, etc)
    Alert.alert(
      'Berhasil',
      'Permohonan Surat Keterangan Miskin berhasil dikirim',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/arrow_left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Form Surat Keterangan Miskin</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        {!checkUserDataComplete() && (
          <TouchableOpacity
            style={styles.warningCard}
            onPress={() => navigation.navigate('CompleteData')}
          >
            <Text style={styles.warningText}>
              ⚠️ Data pribadi Anda belum lengkap. Tap untuk melengkapi data.
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.form}>
          {/* Data Pribadi dari Context - Read Only */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Data Pribadi</Text>
            </View>

            {/* NIK - Read Only */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>NIK</Text>
                <Text style={styles.colon}>:</Text>
              </View>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>{userData.nik || '-'}</Text>
              </View>
            </View>

            {/* Nama Lengkap - Read Only */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <Text style={styles.colon}>:</Text>
              </View>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>
                  {userData.namaLengkap || '-'}
                </Text>
              </View>
            </View>

            {/* Jenis Kelamin - Read Only */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Jenis Kelamin</Text>
                <Text style={styles.colon}>:</Text>
              </View>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>
                  {userData.jenisKelamin || '-'}
                </Text>
              </View>
            </View>

            {/* TTL - Read Only */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>TTL</Text>
                <Text style={styles.colon}>:</Text>
              </View>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>{getTTL() || '-'}</Text>
              </View>
            </View>

            {/* Pekerjaan - Read Only */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Pekerjaan</Text>
                <Text style={styles.colon}>:</Text>
              </View>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>
                  {userData.pekerjaan || '-'}
                </Text>
              </View>
            </View>

            {/* Agama - Read Only */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Agama</Text>
                <Text style={styles.colon}>:</Text>
              </View>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>{userData.agama || '-'}</Text>
              </View>
            </View>

            {/* Alamat - Read Only */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Alamat</Text>
                <Text style={styles.colon}>:</Text>
              </View>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>
                  {userData.alamat || '-'}
                </Text>
              </View>
            </View>

            {/* Status Perkawinan - Read Only */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Status Perkawinan</Text>
                <Text style={styles.colon}>:</Text>
              </View>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>
                  {userData.statusPerkawinan || '-'}
                </Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Form Spesifik Surat Keterangan Miskin */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Data Ekonomi Keluarga</Text>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>
                💰 Isi data ekonomi keluarga dengan jujur dan sesuai kondisi
                sebenarnya untuk kelancaran proses administrasi
              </Text>
            </View>

            {/* Penghasilan Per Bulan */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Penghasilan Per Bulan <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={penghasilanPerBulan}
                onChangeText={setPenghasilanPerBulan}
                placeholder="Contoh: Rp 1.500.000"
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Masukkan total penghasilan keluarga per bulan (jika tidak tetap,
                masukkan rata-rata)
              </Text>
            </View>

            {/* Jumlah Tanggungan */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Jumlah Tanggungan Keluarga{' '}
                <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={jumlahTanggungan}
                onChangeText={setJumlahTanggungan}
                keyboardType="numeric"
                placeholder="Contoh: 4"
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Jumlah anggota keluarga yang menjadi tanggungan (termasuk anak,
                orang tua, dll)
              </Text>
            </View>

            {/* Kondisi Rumah - Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Kondisi Rumah <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={kondisiRumah}
                  onValueChange={itemValue => setKondisiRumah(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Pilih Kondisi Rumah" value="" />
                  <Picker.Item label="Permanen (Tembok)" value="permanen" />
                  <Picker.Item label="Semi Permanen" value="semi_permanen" />
                  <Picker.Item label="Kayu" value="kayu" />
                  <Picker.Item label="Bambu" value="bambu" />
                  <Picker.Item label="Darurat/Tidak Layak" value="darurat" />
                </Picker>
              </View>
              <Text style={styles.helperText}>
                Pilih kondisi bangunan rumah yang ditempati
              </Text>
            </View>

            {/* Status Kepemilikan Rumah - Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Status Kepemilikan Rumah <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={statusKepemilikanRumah}
                  onValueChange={itemValue =>
                    setStatusKepemilikanRumah(itemValue)
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Pilih Status Kepemilikan" value="" />
                  <Picker.Item label="Milik Sendiri" value="milik_sendiri" />
                  <Picker.Item label="Sewa/Kontrak" value="sewa" />
                  <Picker.Item label="Menumpang" value="menumpang" />
                  <Picker.Item
                    label="Milik Orang Tua/Keluarga"
                    value="milik_keluarga"
                  />
                </Picker>
              </View>
            </View>

            {/* Kondisi Ekonomi Keluarga */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Kondisi Ekonomi Keluarga <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textArea}
                value={kondisiEkonomi}
                onChangeText={setKondisiEkonomi}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="Jelaskan kondisi ekonomi keluarga Anda secara detail..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Contoh: Kepala keluarga bekerja sebagai buruh harian dengan
                penghasilan tidak tetap. Memiliki 3 anak yang masih sekolah.
                Istri tidak bekerja. Tidak memiliki aset lain selain rumah
                tinggal yang sederhana.
              </Text>
            </View>

            {/* Keperluan */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Keperluan/Tujuan Surat <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textArea}
                value={keperluan}
                onChangeText={setKeperluan}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Jelaskan untuk keperluan apa surat ini dibuat..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Contoh: Untuk mengajukan bantuan biaya pendidikan anak di
                sekolah, mengurus keringanan pembayaran rumah sakit, mengajukan
                bantuan sosial, dll
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Button Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Kirim Permohonan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/* === Styles === */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  backIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#018129',
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },

  warningCard: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA000',
  },

  warningText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },

  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  sectionContainer: {
    marginBottom: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#018129',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#018129',
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },

  infoBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#018129',
  },

  infoBoxText: {
    fontSize: 13,
    color: '#2E7D32',
    lineHeight: 18,
  },

  inputGroup: {
    marginBottom: 20,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#018129',
    minWidth: 120,
  },

  colon: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
    marginLeft: 4,
  },

  readOnlyInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 0,
    backgroundColor: '#F9F9F9',
  },

  readOnlyText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#666',
    fontStyle: 'italic',
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#018129',
    marginBottom: 8,
  },

  required: {
    color: '#D32F2F',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FAFAFA',
    minHeight: 100,
    textAlignVertical: 'top',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },

  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },

  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    fontStyle: 'italic',
    lineHeight: 16,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  submitButton: {
    backgroundColor: '#018129',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#018129',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SuratKeteranganMiskin;
