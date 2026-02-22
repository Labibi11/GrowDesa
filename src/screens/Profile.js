import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../context/ProfileContext';

export default function Profile() {
  const navigation = useNavigation();
  const { profileData } = useProfile();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with curved background */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Akun Saya</Text>

          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={profileData.profileImage}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* White Content Area */}
        <View style={styles.contentContainer}>
          {/* Name */}
          <Text style={styles.profileName}>{profileData.nama}</Text>

          {/* Info Fields */}
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nama</Text>
              <Text style={styles.infoValue}>{profileData.nama}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>No Telp</Text>
              <Text style={styles.infoValue}>{profileData.noTelp}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Alamat</Text>
              <Text style={styles.infoValue}>{profileData.alamat}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nik</Text>
              <Text style={styles.infoValue}>{profileData.nik}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Jenis Kelamin</Text>
              <Text style={styles.infoValue}>{profileData.jenisKelamin}</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={styles.menuText}>Kelola Profil Anda</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <Text style={styles.menuText}>Ubah Password</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Keluar</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#018129',
  },
  headerContainer: {
    backgroundColor: '#018129',
    paddingTop: 20,
    paddingBottom: 80,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  profileImage: {
    height: 110,
    width: 110,
    borderRadius: 55,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuText: {
    fontSize: 15,
    color: '#333',
  },
  menuArrow: {
    fontSize: 24,
    color: '#999',
  },
});
