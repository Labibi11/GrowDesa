import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Background from '../components/Background';
import ImageGD from '../assets/logo_gd.png';
import TakalarLG from '../assets/Lambang_Kabupaten_Takalar.png';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();
  return (
    <Background>
      <View style={styles.container}>
        {/* 2 Logo Horizontal */}
        <View style={styles.containerLG}>
          <Image source={ImageGD} style={styles.imageGD} resizeMode="contain" />
          <Image
            source={TakalarLG}
            style={styles.imageTKL}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.text}>Username</Text>
        <TextInput placeholder="Masukkan Username" style={styles.input} />
        <Text style={styles.text}>Email</Text>
        <TextInput
          placeholder="Masukkan Alamat Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          placeholder="Masukkan Password"
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.text}>Konfirmasi Password</Text>
        <TextInput
          placeholder="Masukkan Konfirmasi Password"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.textBtn}>Register</Text>
        </TouchableOpacity>

        <View style={styles.containerQs}>
          <Text style={styles.textQs}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textLgn}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
  },
  containerLG: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  imageGD: {
    width: 110,
    height: 110,
  },
  imageTKL: {
    width: 90,
    height: 110,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#018129',
    padding: 10,
    paddingHorizontal: 7,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
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
  button: {
    backgroundColor: '#018129',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
