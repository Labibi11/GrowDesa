import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import IconBack from '../assets/arrow_left.png';
import Produk from '../assets/Produk_1.png';

export default function Detail() {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            marginTop: 15,
            marginLeft: 25,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            opacity: 0.5,
          }}
        >
          <Image
            source={IconBack}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image
          source={Produk}
          style={{ width: '100%', height: 400, marginTop: -20 }}
        />
      </ScrollView>
    </View>
  );
}
