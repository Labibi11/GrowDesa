import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageGD from '../assets/logo_gd.png';
import TakalarLG from '../assets/Lambang_Kabupaten_Takalar.png';

import { useNavigation } from '@react-navigation/native';

export default function FirstScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Konten Tengah */}
      <View style={styles.centerContent}>
        <View style={styles.textContainer}>
          <Text style={styles.textWlc}>
            Selamat datang di Aplikasi{'\n'}
            Layanan Desa, mari mulai{'\n'}
            pelayanan Anda
          </Text>
        </View>

        <View style={styles.containerLG}>
          <Image source={ImageGD} style={styles.imageGD} resizeMode="contain" />
          <Image
            source={TakalarLG}
            style={styles.imageTKL}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Tombol Tetap di Bawah */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.replace('Register')}
        >
          <Text style={styles.textRgs}>Register</Text>
        </TouchableOpacity>

        <View style={styles.containerQs}>
          <Text style={styles.textQs}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.textLgn}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150,
  },
  containerLG: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 20,
  },
  imageTKL: {
    width: 100,
    height: 120,
  },
  imageGD: {
    width: 150,
    height: 150,
  },
  textContainer: {
    marginBottom: 12,
  },
  textWlc: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#018129',
    textAlign: 'center',
    lineHeight: 30,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  registerBtn: {
    backgroundColor: '#018129',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    width: '80%',
  },
  textRgs: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerQs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  textQs: {
    opacity: 0.5,
    fontSize: 13,
  },
  textLgn: {
    color: '#018129',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
