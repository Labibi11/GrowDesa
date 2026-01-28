import { Image, Text, View } from 'react-native';
import ProfileIcon from './../assets/icon_profile.png';

export default function Profile() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text
        style={{
          color: '#018139',
          width: '100%',
          textAlign: 'center',
          fontSize: 18,
          fontWeight: '500',
          paddingTop: 20,
        }}
      >
        Akun Saya
      </Text>
      <View
        style={{
          alignItems: 'center',
          margin: 30,
          borderBottomColor: 'black',
          borderBottomWidth: 0.8,
        }}
      >
        <Image
          source={ProfileIcon}
          style={{
            height: 125,
            width: 125,
            tintColor: '#018139',
            borderRadius: 70,
            borderWidth: 2,
            borderColor: '#018139',
          }}
        />
        <Text
          style={{
            padding: 20,
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 30,
          }}
        >
          M.Risky Habibie
        </Text>
      </View>
    </View>
  );
}
