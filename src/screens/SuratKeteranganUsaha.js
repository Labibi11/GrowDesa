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
import { useProfile } from '../context/ProfileContext';

const SuratKeteranganUsaha = ({ navigation }) => {
  const { userData, getTTL, checkUserDataComplete } = useProfile();

  // State untuk field spesifik form ini
  const [namaUsaha, setNamaUsaha] = useState('');
  const [jenisUsaha, setJenisUsaha] = useState('');
  const [alamatUsaha, setAlamatUsaha] = useState('');
  const [tahunBerdiri, setTahunBerdiri] = useState('');

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
    if (!namaUsaha || !jenisUsaha || !alamatUsaha || !tahunBerdiri) {
      Alert.alert('Peringatan', 'Harap lengkapi semua field yang diperlukan');
      return;
    }

    // Validasi tahun berdiri (4 digit)
    if (tahunBerdiri.length !== 4) {
      Alert.alert('Peringatan', 'Tahun berdiri harus 4 digit (contoh: 2020)');
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
      // Data dari Context (Data Pemilik Usaha)
      nik: userData.nik,
      namaLengkap: userData.namaLengkap,
      jenisKelamin: userData.jenisKelamin,
      ttl: getTTL(),

      // Data spesifik form (Data Usaha)
      namaUsaha,
      jenisUsaha,
      alamatUsaha,
      tahunBerdiri,
    };

    console.log('Form Data:', formData);

    // TODO: Add your submit logic here (API call, navigation, etc)
    Alert.alert(
      'Berhasil',
      'Permohonan Surat Keterangan Usaha berhasil dikirim',
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
        <Text style={styles.headerTitle}>Form Surat Keterangan Usaha</Text>
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
          {/* Data Pemilik Usaha dari Context - Read Only */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Data Pemilik Usaha</Text>
            </View>

            {/* NIK - Read Only Horizontal */}
            <View style={styles.inputGroupHorizontal}>
              <Text style={styles.label}>NIK</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.readOnlyText}>{userData.nik || '-'}</Text>
            </View>

            {/* Nama Lengkap - Read Only Horizontal */}
            <View style={styles.inputGroupHorizontal}>
              <Text style={styles.label}>Nama Lengkap</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.readOnlyText}>
                {userData.namaLengkap || '-'}
              </Text>
            </View>

            {/* Jenis Kelamin - Read Only Horizontal */}
            <View style={styles.inputGroupHorizontal}>
              <Text style={styles.label}>Jenis Kelamin</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.readOnlyText}>
                {userData.jenisKelamin || '-'}
              </Text>
            </View>

            {/* TTL - Read Only Horizontal */}
            <View style={styles.inputGroupHorizontal}>
              <Text style={styles.label}>TTL</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.readOnlyText}>{getTTL() || '-'}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Form Spesifik Surat Usaha */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Data Usaha</Text>

            {/* Nama Usaha */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Nama Usaha <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={namaUsaha}
                onChangeText={setNamaUsaha}
                placeholder="Masukkan nama usaha Anda"
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Contoh: Warung Makan Sederhana, Toko Kelontong Jaya
              </Text>
            </View>

            {/* Jenis Usaha */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Jenis Usaha <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textArea}
                value={jenisUsaha}
                onChangeText={setJenisUsaha}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                placeholder="Jelaskan jenis usaha Anda..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Contoh: Usaha kuliner (warung makan), perdagangan (toko
                kelontong), jasa (bengkel motor)
              </Text>
            </View>

            {/* Alamat Usaha */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Alamat Usaha <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textArea}
                value={alamatUsaha}
                onChangeText={setAlamatUsaha}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                placeholder="Masukkan alamat lengkap usaha Anda"
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Contoh: Jl. Pasar No. 15, Kelurahan Wajo, Kecamatan Mamajang,
                Makassar
              </Text>
            </View>

            {/* Tahun Berdiri */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Tahun Berdiri <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={tahunBerdiri}
                onChangeText={setTahunBerdiri}
                keyboardType="numeric"
                maxLength={4}
                placeholder="Contoh: 2020"
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Masukkan tahun usaha Anda didirikan (4 digit)
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

  // Layout horizontal untuk data pemilik usaha read-only
  inputGroupHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 4,
  },

  inputGroup: {
    marginBottom: 20,
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
    marginHorizontal: 4,
  },

  readOnlyText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#666',
    fontStyle: 'italic',
    flex: 1,
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
    minHeight: 80,
    textAlignVertical: 'top',
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

export default SuratKeteranganUsaha;
