import React from 'react';
import Background from '../components/Background';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageGD from '../assets/logo_gd.png';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  return (
    <Background>
      <View style={styles.container}>
        <Image source={ImageGD} style={styles.logo} />
        <View>
          <Text style={styles.text}>Email</Text>
          <TextInput placeholder="Masukkan Alamat Email" style={styles.input} />
          <Text style={styles.text}>Password</Text>
          <TextInput placeholder="Masukkan Password" style={styles.input} />
          <TouchableOpacity style={styles.link}>
            <Text style={{ fontSize: 13 }}>Lupa Password?</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ opacity: 0.5, fontSize: 13 }}>
              Belum punya akun?
            </Text>
            <TouchableOpacity>
              <Text
                style={{ color: '#018129', fontSize: 13 }}
                onPress={() => navigation.navigate('Register')}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: '#fff' }}>Login</Text>
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
    marginBottom: 5,
  },
  link: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: -10,
    opacity: 0.5,
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
  button: {
    backgroundColor: '#018129',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
});
