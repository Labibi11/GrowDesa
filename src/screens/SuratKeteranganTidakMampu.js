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

const SuratKeteranganTidakMampu = ({ navigation }) => {
  const { userData, getTTL, checkUserDataComplete } = useProfile();

  // State untuk field spesifik form ini
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
    if (!keperluan) {
      Alert.alert('Peringatan', 'Harap isi keperluan Anda');
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

      // Data spesifik form
      keperluan,
    };

    console.log('Form Data:', formData);

    // TODO: Add your submit logic here (API call, navigation, etc)
    Alert.alert(
      'Berhasil',
      'Permohonan Surat Keterangan Tidak Mampu berhasil dikirim',
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
        <Text style={styles.headerTitle}>
          Form Surat Keterangan{'\n'}Tidak Mampu
        </Text>
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

          {/* Form Spesifik Surat Tidak Mampu */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Keterangan Tidak Mampu</Text>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>
                💡 Jelaskan kondisi ekonomi dan alasan pengajuan surat
                keterangan tidak mampu Anda
              </Text>
            </View>

            {/* Keperluan */}
            <View style={styles.inputGroup}>
              <Text style={styles.sectionLabel}>
                Keperluan <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textArea}
                value={keperluan}
                onChangeText={setKeperluan}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
                placeholder="Jelaskan kondisi ekonomi keluarga, sumber penghasilan, jumlah tanggungan, dan keperluan pengajuan surat ini..."
                placeholderTextColor="#aaa"
              />
              <Text style={styles.helperText}>
                Contoh: Saya mengajukan surat keterangan tidak mampu untuk
                keperluan bantuan biaya pendidikan anak. Penghasilan keluarga
                saya sebagai buruh harian tidak menentu dengan rata-rata Rp
                50.000/hari. Saya memiliki 3 orang anak yang masih sekolah.
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
    lineHeight: 22,
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

  // Layout horizontal untuk data pribadi read-only
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

  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FAFAFA',
    minHeight: 150,
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

export default SuratKeteranganTidakMampu;
