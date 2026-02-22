import React, { useState } from 'react';
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
import TakalarLG from '../assets/Lambang_Kabupaten_Takalar.png';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        <View>
          <Text style={styles.text}>Email</Text>
          <TextInput
            placeholder="Masukkan Alamat Email"
            style={styles.input}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder="Masukkan Password"
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.link}>
            <Text style={{ fontSize: 13 }}>Lupa Password?</Text>
          </TouchableOpacity>
          <View style={styles.containerQs}>
            <Text style={styles.textQs}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.textRgs}>Register</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('MyTabs')}
          >
            <Text style={styles.textBtn}>Login</Text>
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
  link: {
    alignItems: 'flex-end',
    marginTop: -10,
    opacity: 0.5,
  },
  containerQs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textQs: {
    opacity: 0.5,
    fontSize: 13,
  },
  textRgs: {
    color: '#018129',
    fontSize: 13,
    fontWeight: 'bold',
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
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
