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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useProfile } from '../context/ProfileContext';

const CompleteData = ({ navigation }) => {
  const {
    completeData,
    updateCompleteData,
    updateMultipleFields,
    syncCompleteToUserData,
    profileData,
  } = useProfile();

  // Local state untuk form
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    alamat: '',
    pekerjaan: '',
    agama: '',
    statusPerkawinan: '',
  });

  // State untuk foto
  const [fotoSelfie, setFotoSelfie] = useState(null);
  const [fotoKTP, setFotoKTP] = useState(null);

  // Load data dari context saat component mount
  useEffect(() => {
    // Pre-fill dari profileData jika ada
    setFormData({
      nik: completeData.nik || profileData.nik || '',
      nama: completeData.nama || profileData.nama || '',
      tempatLahir: completeData.tempatLahir || '',
      tanggalLahir: completeData.tanggalLahir || '',
      jenisKelamin: completeData.jenisKelamin || profileData.jenisKelamin || '',
      alamat: completeData.alamat || profileData.alamat || '',
      pekerjaan: completeData.pekerjaan || '',
      agama: completeData.agama || '',
      statusPerkawinan: '',
    });

    // Load foto jika ada
    if (completeData.fotoSelfie) {
      setFotoSelfie(completeData.fotoSelfie);
    }
    if (completeData.fotoKTP) {
      setFotoKTP(completeData.fotoKTP);
    }
  }, [completeData, profileData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fungsi untuk mengambil foto selfie (kamera depan saja)
  const takeSelfie = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'front', // Kamera depan
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
      saveToPhotos: false,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        Alert.alert('Error', 'Gagal membuka kamera');
      } else if (response.assets && response.assets[0]) {
        const source = response.assets[0].uri;
        setFotoSelfie(source);
        console.log('Selfie captured:', source);
      }
    });
  };

  // Fungsi untuk mengambil foto KTP (pilih galeri atau kamera)
  const pickKTPImage = () => {
    Alert.alert(
      'Foto KTP',
      'Pilih sumber foto KTP',
      [
        {
          text: 'Galeri',
          onPress: () => openGallery(),
        },
        {
          text: 'Kamera',
          onPress: () => openCamera(),
        },
        {
          text: 'Batal',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  // Buka galeri untuk foto KTP
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Gagal membuka galeri');
      } else if (response.assets && response.assets[0]) {
        const source = response.assets[0].uri;
        setFotoKTP(source);
        console.log('KTP image selected from gallery:', source);
      }
    });
  };

  // Buka kamera (belakang) untuk foto KTP
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back', // Kamera belakang
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
      saveToPhotos: false,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        Alert.alert('Error', 'Gagal membuka kamera');
      } else if (response.assets && response.assets[0]) {
        const source = response.assets[0].uri;
        setFotoKTP(source);
        console.log('KTP image captured:', source);
      }
    });
  };

  const handleSave = () => {
    // Validasi data wajib
    if (!formData.nama || !formData.nik || !formData.jenisKelamin) {
      Alert.alert(
        'Peringatan',
        'Harap lengkapi minimal Nama, NIK, dan Jenis Kelamin',
      );
      return;
    }

    // Validasi NIK (16 digit)
    if (formData.nik.length !== 16) {
      Alert.alert('Peringatan', 'NIK harus 16 digit');
      return;
    }

    // Validasi foto (opsional, bisa diaktifkan jika wajib)
    if (!fotoSelfie || !fotoKTP) {
      Alert.alert('Peringatan', 'Harap lengkapi foto selfie dan foto KTP');
      return;
    }

    // Update completeData
    updateCompleteData({
      ...formData,
      fotoSelfie: fotoSelfie,
      fotoKTP: fotoKTP,
      isCompleted: true,
    });

    // Update userData untuk form surat
    updateMultipleFields({
      namaLengkap: formData.nama,
      nik: formData.nik,
      jenisKelamin: formData.jenisKelamin,
      tempatLahir: formData.tempatLahir,
      tanggalLahir: formData.tanggalLahir,
      pekerjaan: formData.pekerjaan,
      agama: formData.agama,
      alamat: formData.alamat,
      statusPerkawinan: formData.statusPerkawinan,
    });

    Alert.alert(
      'Berhasil',
      'Data pribadi berhasil disimpan dan siap digunakan untuk form surat',
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
        <Text style={styles.headerTitle}>Lengkapi Data Pribadi</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Lengkapi data pribadi Anda untuk mempermudah pengisian form surat.
            Data ini akan otomatis terisi di semua form surat yang Anda buat.
          </Text>
        </View>

        <View style={styles.form}>
          {/* Nama Lengkap */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Nama Lengkap <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.nama}
              onChangeText={value => handleInputChange('nama', value)}
              placeholder="Masukkan nama lengkap sesuai KTP"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* NIK */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              NIK <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.nik}
              onChangeText={value => handleInputChange('nik', value)}
              keyboardType="numeric"
              maxLength={16}
              placeholder="Masukkan NIK (16 digit)"
              placeholderTextColor="#aaa"
            />
            <Text style={styles.helperText}>NIK harus 16 digit angka</Text>
          </View>

          {/* Jenis Kelamin */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Jenis Kelamin <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.jenisKelamin}
                onValueChange={value =>
                  handleInputChange('jenisKelamin', value)
                }
                style={styles.picker}
              >
                <Picker.Item label="Laki-laki" value="Laki-laki" />
                <Picker.Item label="Perempuan" value="Perempuan" />
              </Picker>
            </View>
          </View>

          {/* Tempat Lahir */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tempat Lahir</Text>
            <TextInput
              style={styles.input}
              value={formData.tempatLahir}
              onChangeText={value => handleInputChange('tempatLahir', value)}
              placeholder="Contoh: Jakarta"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Tanggal Lahir */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <TouchableOpacity style={styles.dateInput}>
              <TextInput
                style={styles.dateInputText}
                value={formData.tanggalLahir}
                onChangeText={value => handleInputChange('tanggalLahir', value)}
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#aaa"
              />
              <Image
                source={require('../assets/uiw_date.png')}
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
            <Text style={styles.helperText}>Format: 01-01-1990</Text>
          </View>

          {/* Pekerjaan */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pekerjaan</Text>
            <TextInput
              style={styles.input}
              value={formData.pekerjaan}
              onChangeText={value => handleInputChange('pekerjaan', value)}
              placeholder="Contoh: Karyawan Swasta, Wiraswasta, PNS"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Agama */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Agama</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.agama}
                onValueChange={value => handleInputChange('agama', value)}
                style={styles.picker}
              >
                <Picker.Item label="Pilih Agama" value="" />
                <Picker.Item label="Islam" value="Islam" />
                <Picker.Item label="Kristen" value="Kristen" />
                <Picker.Item label="Katolik" value="Katolik" />
                <Picker.Item label="Hindu" value="Hindu" />
                <Picker.Item label="Buddha" value="Buddha" />
                <Picker.Item label="Konghucu" value="Konghucu" />
              </Picker>
            </View>
          </View>

          {/* Status Perkawinan */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status Perkawinan</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.statusPerkawinan}
                onValueChange={value =>
                  handleInputChange('statusPerkawinan', value)
                }
                style={styles.picker}
              >
                <Picker.Item label="Pilih Status" value="" />
                <Picker.Item label="Belum Kawin" value="Belum Kawin" />
                <Picker.Item label="Kawin" value="Kawin" />
                <Picker.Item label="Cerai Hidup" value="Cerai Hidup" />
                <Picker.Item label="Cerai Mati" value="Cerai Mati" />
              </Picker>
            </View>
          </View>

          {/* Alamat */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Alamat (Sesuai KTP)</Text>
            <TextInput
              style={styles.textArea}
              value={formData.alamat}
              onChangeText={value => handleInputChange('alamat', value)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholder="Masukkan alamat lengkap sesuai KTP"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        {/* Section Foto */}
        <View style={styles.photoSection}>
          <Text style={styles.photoSectionTitle}>Upload Foto</Text>

          {/* Foto Selfie */}
          <View style={styles.photoItem}>
            <Text style={styles.photoLabel}>Foto Selfie</Text>
            <Text style={styles.photoDescription}>
              Gunakan kamera depan untuk mengambil foto wajah Anda
            </Text>

            {fotoSelfie ? (
              <View style={styles.imagePreview}>
                <Image
                  source={{ uri: fotoSelfie }}
                  style={styles.previewImage}
                />
                <View style={styles.imageActions}>
                  <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={takeSelfie}
                  >
                    <Text style={styles.retakeButtonText}>📷 Ambil Ulang</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => setFotoSelfie(null)}
                  >
                    <Text style={styles.removeButtonText}>🗑️ Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={styles.photoButton} onPress={takeSelfie}>
                <Text style={styles.photoButtonIcon}>📷</Text>
                <Text style={styles.photoButtonText}>Ambil Foto Selfie</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Foto KTP */}
          <View style={styles.photoItem}>
            <Text style={styles.photoLabel}>Foto KTP</Text>
            <Text style={styles.photoDescription}>
              Ambil foto KTP yang jelas dan dapat terbaca
            </Text>

            {fotoKTP ? (
              <View style={styles.imagePreview}>
                <Image source={{ uri: fotoKTP }} style={styles.previewImage} />
                <View style={styles.imageActions}>
                  <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={pickKTPImage}
                  >
                    <Text style={styles.retakeButtonText}>📷 Ambil Ulang</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => setFotoKTP(null)}
                  >
                    <Text style={styles.removeButtonText}>🗑️ Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.photoButton}
                onPress={pickKTPImage}
              >
                <Text style={styles.photoButtonIcon}>🖼️</Text>
                <Text style={styles.photoButtonText}>Pilih Foto KTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Button Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Simpan Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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

  infoCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#018129',
  },

  infoText: {
    fontSize: 13,
    color: '#2E7D32',
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
    marginBottom: 16,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
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

  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
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

  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
  },

  dateInputText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },

  calendarIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },

  // Photo Section Styles
  photoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  photoSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#018129',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#018129',
  },

  photoItem: {
    marginBottom: 24,
  },

  photoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#018129',
    marginBottom: 4,
  },

  photoDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },

  photoButton: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#018129',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  photoButtonText: {
    fontSize: 14,
    color: '#018129',
    fontWeight: '600',
  },

  imagePreview: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  imageActions: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
  },

  retakeButton: {
    flex: 1,
    backgroundColor: '#018129',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },

  retakeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  removeButton: {
    flex: 1,
    backgroundColor: '#F44336',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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

export default CompleteData;
