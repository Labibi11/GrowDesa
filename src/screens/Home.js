import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import produk from '../assets/Produk_1.png';
import LocationIcon from '../assets/icon_lokasi.png';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <ImageHeader />
      <View style={styles.containerPrd}>
        <Text style={styles.textNewPrd}>Produk Terbaru</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Produk')}>
          <Text style={styles.textViewMore}>Lihat lebih banyak &gt;&gt;</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.containerCardPrd}
            onPress={() => navigation.navigate('Detail')}
          >
            <View style={styles.viewCard}>
              <Image source={produk} style={styles.imgPrd} />
              <Text style={styles.titlePrd} numberOfLines={2}>
                NAMAasdasdasdasdasdasdasdasdasdsdasda
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image source={LocationIcon} style={styles.iconLct} />
                <Text style={styles.textLct}>Lokasi dari penjual</Text>
              </View>
              <Text style={styles.price}>Rp120.000</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerCardPrd}
            onPress={() => navigation.navigate('Detail')}
          >
            <View style={styles.viewCard}>
              <Image source={produk} style={styles.imgPrd} />
              <Text style={styles.titlePrd} numberOfLines={2}>
                NAMAasdasdasdasdasdasdasdasdasdsdasda
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image source={LocationIcon} style={styles.iconLct} />
                <Text style={styles.textLct}>Lokasi dari penjual</Text>
              </View>
              <Text style={styles.price}>Rp120.000</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerCardPrd}
            onPress={() => navigation.navigate('Detail')}
          >
            <View style={styles.viewCard}>
              <Image source={produk} style={styles.imgPrd} />
              <Text style={styles.titlePrd} numberOfLines={2}>
                NAMAasdasdasdasdasdasdasdasdasdsdasda
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image source={LocationIcon} style={styles.iconLct} />
                <Text style={styles.textLct}>Lokasi dari penjual</Text>
              </View>
              <Text style={styles.price}>Rp120.000</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerCardPrd}
            onPress={() => navigation.navigate('Detail')}
          >
            <View style={styles.viewCard}>
              <Image source={produk} style={styles.imgPrd} />
              <Text style={styles.titlePrd} numberOfLines={2}>
                NAMAasdasdasdasdasdasdasdasdasdsdasda
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image source={LocationIcon} style={styles.iconLct} />
                <Text style={styles.textLct}>Lokasi dari penjual</Text>
              </View>
              <Text style={styles.price}>Rp120.000</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={{ margin: 20 }}>
          <Text style={styles.textNewFrm}>Forum Terbaru</Text>
          <TouchableOpacity style={styles.containerCardFrm}>
            <View>
              <Image source={produk} style={styles.imgFrm} />
            </View>
            <View style={styles.containerTextFrm}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold' }}
                numberOfLines={2}
              >
                JUDUL DESKRIPSI DARI FORUM YANG DITAMPILKAN
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 11 }}>
                AUTHOR
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 11 }}>
                11 Agustus 2004
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerCardFrm}>
            <View>
              <Image source={produk} style={styles.imgFrm} />
            </View>
            <View style={styles.containerTextFrm}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold' }}
                numberOfLines={2}
              >
                JUDUL DESKRIPSI DARI FORUM YANG DITAMPILKAN
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 11 }}>
                AUTHOR
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 11 }}>
                11 Agustus 2004
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerCardFrm}>
            <View>
              <Image source={produk} style={styles.imgFrm} />
            </View>
            <View style={styles.containerTextFrm}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold' }}
                numberOfLines={2}
              >
                JUDUL DESKRIPSI DARI FORUM YANG DITAMPILKAN
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 11 }}>
                AUTHOR
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 11 }}>
                11 Agustus 2004
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#018129',
    fontSize: 13,
  },
  containerPrd: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -15,
  },
  textNewPrd: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textViewMore: {
    fontWeight: 'medium',
    fontSize: 10,
    color: 'gray',
    marginTop: 20,
  },
  containerCardPrd: {
    marginHorizontal: 7,
    marginBottom: 5,
  },
  viewCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 170,
    elevation: 3,
    marginHorizontal: 5,
  },
  imgPrd: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titlePrd: {
    fontWeight: '500',
    fontSize: 14,
    margin: 5,
  },
  iconLct: {
    width: 15,
    height: 15,
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
    margin: 5,
  },
  textNewFrm: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  containerCardFrm: {
    marginBottom: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
  },
  imgFrm: {
    width: 120,
    height: 100,
    borderRadius: 20,
  },
  containerTextFrm: {
    marginLeft: 20,
    width: '60%',
  },
});
