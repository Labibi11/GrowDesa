import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageGD from '../assets/logo_gd.png';

import { useNavigation } from '@react-navigation/native';

export default function FirstScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textWlc}>
          Selamat datang di Aplikasi{'\n'}
          Layanan Desa, mari mulai{'\n'}
          pelayanan Anda
        </Text>
      </View>
      <Image source={ImageGD} style={styles.image} />
      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => navigation.replace('Register')}
      >
        <Text style={styles.textRgs}>Register</Text>
      </TouchableOpacity>
      <View style={styles.containerQs}>
        <Text style={styles.textQs}>Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.textLgn}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWlc: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#018129',
    width: '100%',
    textAlign: 'center',
  },
  image: {
    display: 'flex',
    alignContent: 'center',
    marginBottom: 200,
  },
  textRgs: {
    color: '#fff',
  },
  containerQs: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerBtn: {
    backgroundColor: '#018129',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    width: '80%',
  },
  textQs: {
    opacity: 0.5,
    fontSize: 13,
  },
  textLgn: {
    color: '#018129',
    fontSize: 13,
  },
});
