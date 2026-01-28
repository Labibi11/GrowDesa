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
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();
  return (
    <Background>
      <View style={styles.container}>
        <Image source={ImageGD} style={styles.logo} />
        <Text style={styles.text}>Username</Text>
        <TextInput placeholder="Masukkan Username" style={styles.input} />
        <Text style={styles.text}>Email</Text>
        <TextInput placeholder="Masukkan Alamat Email" style={styles.input} />
        <Text style={styles.text}>Password</Text>
        <TextInput placeholder="Masukkan Password" style={styles.input} />
        <Text style={styles.text}>Konfirmasi Password</Text>
        <TextInput
          placeholder="Masukkan Konfirmasi Password"
          style={styles.input}
        />{' '}
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Text style={styles.textQs}>Sudah punya akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textLgn}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: '#fff' }}>Register</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
  },
  logo: {
    width: 200,
    height: 200,
    margin: 30,
    display: 'flex',
    alignSelf: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
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
  textQs: {
    opacity: 0.5,
    fontSize: 13,
  },
  textLgn: {
    color: '#018129',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#018129',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
});
