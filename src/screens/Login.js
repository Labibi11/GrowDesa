import React from 'react';
import Background from '../components/Background';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import ImageGD from '../assets/logo_gd.png';

export default function Login() {
  return (
    <Background>
      <View style={styles.container}>
        <Image source={ImageGD} style={styles.logo} />
        <View>
          <Text>Email</Text>
          <TextInput placeholder="Masukkan Alamat Email" style={styles.input} />
          <Text>Password</Text>
          <TextInput placeholder="Masukkan Password" style={styles.input} />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    margin: 30,
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
});
