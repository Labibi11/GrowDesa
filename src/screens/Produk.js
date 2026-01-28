import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../assets/Icon_search.png';
import produk from '../assets/Produk_1.png';
import LocationIcon from '../assets/icon_lokasi.png';

export default function Produk() {
  const navigation = useNavigation();
  const productsData = [
    {
      id: '1',
      name: 'NAMA Produk 1 yang sangat panjang sekali',
      location: 'Lokasi dari penjual A',
      price: 'Rp120.000',
      image: produk,
    },
    {
      id: '2',
      name: 'NAMA Produk 2',
      location: 'Lokasi dari penjual B',
      price: 'Rp150.000',
      image: produk,
    },
    {
      id: '3',
      name: 'NAMA Produk 3',
      location: 'Lokasi dari penjual C',
      price: 'Rp95.000',
      image: produk,
    },
    {
      id: '4',
      name: 'NAMA Produk 4',
      location: 'Lokasi dari penjual D',
      price: 'Rp200.000',
      image: produk,
    },
    {
      id: '5',
      name: 'NAMA Produk 5 (Ganjil)',
      location: 'Lokasi dari penjual E',
      price: 'Rp80.000',
      image: produk,
    },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: 'white', flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: 10, paddingLeft: 10 }}>
        <Text
          style={{
            color: '#018129',
            fontSize: 18,
            padding: 10,
            fontWeight: '500',
          }}
        >
          Produk Pilihan
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            width: '96%',
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}
        >
          <Image
            source={SearchIcon}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
              opacity: 0.4,
            }}
          />
          <TextInput
            placeholder="Search Product"
            style={{ flex: 1 }}
          ></TextInput>
        </View>
      </View>
      <View style={{ marginTop: 20, marginLeft: 17 }}>
        <View style={styles.productGrid}>
          {productsData.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.containerCardPrd}
              onPress={() => navigation.navigate('Detail', { product: item })}
            >
              <View style={styles.viewCard}>
                <Image source={item.image} style={styles.imgPrd} />
                <Text style={styles.titlePrd} numberOfLines={2}>
                  {item.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={LocationIcon} style={styles.iconLct} />
                  <Text style={styles.textLct}>{item.location}</Text>
                </View>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  containerCardPrd: {
    width: '46%',
    marginVertical: 10,
    marginRight: '4%',
  },
  viewCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    elevation: 3,
  },
  imgPrd: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  titlePrd: {
    fontWeight: '500',
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  iconLct: {
    width: 15,
    height: 15,
    marginLeft: 10,
    marginRight: 5,
  },
  textLct: {
    color: '#7A7A7A',
    fontSize: 11,
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#018129',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
