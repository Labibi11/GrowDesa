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
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../context/ProfileContext';

const ChangePassword = () => {
  const navigation = useNavigation();
  const { profileData, updateProfile } = useProfile();

  const [selectedGender, setSelectedGender] = useState(
    profileData.jenisKelamin.toLowerCase(),
  );
  const [formData, setFormData] = useState({
    nama: profileData.nama,
    noTelp: profileData.noTelp,
    alamat: profileData.alamat,
    nik: profileData.nik,
  });

  // Update form ketika profileData berubah
  useEffect(() => {
    setFormData({
      nama: profileData.nama,
      noTelp: profileData.noTelp,
      alamat: profileData.alamat,
      nik: profileData.nik,
    });
    setSelectedGender(profileData.jenisKelamin.toLowerCase());
  }, [profileData]);

  const handleSave = () => {
    // Update data di Context
    updateProfile({
      nama: formData.nama,
      noTelp: formData.noTelp,
      alamat: formData.alamat,
      nik: formData.nik,
      jenisKelamin: selectedGender === 'perempuan' ? 'Perempuan' : 'Laki-Laki',
    });

    console.log('Data saved:', formData, selectedGender);
    // Kembali ke Profile
    navigation.goBack();
  };

  const handleCancel = () => {
    console.log('Cancelled');
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
        <Text style={styles.headerTitle}>Ubah Password</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Nama */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password Lama</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan Password Lama"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* No Telp */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password Baru</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan Password Baru"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          {/* Alamat */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Konfirmasi Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Konfirmasi Password"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Selesai</Text>
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#047857',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navItemCenter: {
    flex: 1,
    alignItems: 'center',
    marginTop: -28,
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#047857',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#047857',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  navIcon: {
    fontSize: 24,
  },
  navIconActive: {
    fontSize: 24,
  },
  navIconCenter: {
    fontSize: 28,
  },
  navText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  navTextActive: {
    color: '#047857',
  },
});

export default ChangePassword;
