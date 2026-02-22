import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../context/ProfileContext';

const EditProfile = () => {
  const navigation = useNavigation();
  const {
    profileData,
    completeData,
    updateProfile,
    updateCompleteData,
    updateMultipleFields,
  } = useProfile();

  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    pekerjaan: '',
    agama: '',
    statusPerkawinan: '',
    alamat: '',
  });

  // Load data dari context saat component mount
  useEffect(() => {
    setFormData({
      nama: completeData.nama || profileData.nama || '',
      nik: completeData.nik || profileData.nik || '',
      jenisKelamin: completeData.jenisKelamin || profileData.jenisKelamin || '',
      tempatLahir: completeData.tempatLahir || '',
      tanggalLahir: completeData.tanggalLahir || '',
      pekerjaan: completeData.pekerjaan || '',
      agama: completeData.agama || '',
      statusPerkawinan: completeData.statusPerkawinan || '',
      alamat: completeData.alamat || profileData.alamat || '',
    });
  }, [completeData, profileData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Update profileData
    updateProfile({
      nama: formData.nama,
      nik: formData.nik,
      jenisKelamin: formData.jenisKelamin,
      alamat: formData.alamat,
    });

    // Update completeData
    updateCompleteData({
      ...completeData,
      nama: formData.nama,
      nik: formData.nik,
      jenisKelamin: formData.jenisKelamin,
      tempatLahir: formData.tempatLahir,
      tanggalLahir: formData.tanggalLahir,
      pekerjaan: formData.pekerjaan,
      agama: formData.agama,
      statusPerkawinan: formData.statusPerkawinan,
      alamat: formData.alamat,
    });

    // Sync ke userData untuk form surat
    updateMultipleFields({
      namaLengkap: formData.nama,
      nik: formData.nik,
      jenisKelamin: formData.jenisKelamin,
      tempatLahir: formData.tempatLahir,
      tanggalLahir: formData.tanggalLahir,
      pekerjaan: formData.pekerjaan,
      agama: formData.agama,
      statusPerkawinan: formData.statusPerkawinan,
      alamat: formData.alamat,
    });

    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}
        >
          <Image
            source={require('../assets/arrow_left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={profileData.profileImage}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIconContainer}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{profileData.nama}</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Nama Lengkap */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Nama Lengkap <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama lengkap sesuai KTP"
              placeholderTextColor="#9CA3AF"
              value={formData.nama}
              onChangeText={text => handleInputChange('nama', text)}
            />
          </View>

          {/* NIK */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              NIK <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan NIK (16 digit)"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              maxLength={16}
              value={formData.nik}
              onChangeText={text => handleInputChange('nik', text)}
            />
            <Text style={styles.helperText}>NIK harus 16 digit angka</Text>
          </View>

          {/* Jenis Kelamin */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Jenis Kelamin <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.jenisKelamin === 'Laki-laki' &&
                    styles.genderButtonActive,
                ]}
                onPress={() => handleInputChange('jenisKelamin', 'Laki-laki')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    formData.jenisKelamin === 'Laki-laki' &&
                      styles.genderButtonTextActive,
                  ]}
                >
                  Laki-laki
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.jenisKelamin === 'Perempuan' &&
                    styles.genderButtonActive,
                ]}
                onPress={() => handleInputChange('jenisKelamin', 'Perempuan')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    formData.jenisKelamin === 'Perempuan' &&
                      styles.genderButtonTextActive,
                  ]}
                >
                  Perempuan
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tempat Lahir */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tempat Lahir</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Jakarta"
              placeholderTextColor="#9CA3AF"
              value={formData.tempatLahir}
              onChangeText={text => handleInputChange('tempatLahir', text)}
            />
          </View>

          {/* Tanggal Lahir */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <View style={styles.dateInput}>
              <TextInput
                style={styles.dateInputText}
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#9CA3AF"
                value={formData.tanggalLahir}
                onChangeText={text => handleInputChange('tanggalLahir', text)}
              />
              <Image
                source={require('../assets/uiw_date.png')}
                style={styles.calendarIcon}
              />
            </View>
            <Text style={styles.helperText}>Format: 01-01-1990</Text>
          </View>

          {/* Pekerjaan */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Pekerjaan</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Karyawan Swasta, Wiraswasta, PNS"
              placeholderTextColor="#9CA3AF"
              value={formData.pekerjaan}
              onChangeText={text => handleInputChange('pekerjaan', text)}
            />
          </View>

          {/* Agama */}
          <View style={styles.formGroup}>
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
          <View style={styles.formGroup}>
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
          <View style={styles.formGroup}>
            <Text style={styles.label}>Alamat (Sesuai KTP)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Masukkan alamat lengkap sesuai KTP"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={formData.alamat}
              onChangeText={text => handleInputChange('alamat', text)}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Selesai</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#047857',
    flex: 1,
    textAlign: 'center',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editIcon: {
    fontSize: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  required: {
    color: '#D32F2F',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#047857',
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  genderButtonTextActive: {
    color: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#1F2937',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  dateInputText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    padding: 0,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    padding: 20,
    paddingBottom: 30,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#047857',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#047857',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#047857',
  },
});

export default EditProfile;
