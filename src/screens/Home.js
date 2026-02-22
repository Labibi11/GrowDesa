import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import { useNavigation } from '@react-navigation/native';
import {
  statistikData,
  getTotalKelahiran,
  getTotalKematian,
} from '../data/DataStatistik';
import { forumData } from '../data/DataForum';

export default function Home() {
  const navigation = useNavigation();

  // Format angka dengan titik pemisah ribuan
  const formatNumber = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Data card untuk ditampilkan di home
  const cardData = [
    {
      id: 1,
      title: 'Jumlah Penduduk',
      value: formatNumber(statistikData.totalPenduduk),
      icon: '👥',
      color: '#4A90E2',
    },
    {
      id: 2,
      title: 'Laki-laki',
      value: formatNumber(statistikData.totalLakiLaki),
      icon: '👨',
      color: '#5CB85C',
    },
    {
      id: 3,
      title: 'Perempuan',
      value: formatNumber(statistikData.totalPerempuan),
      icon: '👩',
      color: '#E91E63',
    },
    {
      id: 4,
      title: 'Pekerjaan',
      value: formatNumber(
        statistikData.pekerjaan.reduce((sum, item) => sum + item.value, 0),
      ),
      icon: '💼',
      color: '#FF9800',
    },
    {
      id: 5,
      title: 'Pendidikan',
      value: formatNumber(
        statistikData.pendidikan.reduce((sum, item) => sum + item.value, 0),
      ),
      icon: '🎓',
      color: '#9C27B0',
    },
    {
      id: 6,
      title: 'Status Ekonomi',
      value: formatNumber(
        statistikData.statusEkonomi.reduce((sum, item) => sum + item.value, 0),
      ),
      icon: '💰',
      color: '#00BCD4',
    },
    {
      id: 7,
      title: 'Agama',
      value: formatNumber(
        statistikData.agama.reduce((sum, item) => sum + item.value, 0),
      ),
      icon: '🕌',
      color: '#795548',
    },
    {
      id: 8,
      title: 'Status Perkawinan',
      value: formatNumber(
        statistikData.statusPerkawinan.reduce(
          (sum, item) => sum + item.value,
          0,
        ),
      ),
      icon: '💑',
      color: '#F44336',
    },
    {
      id: 9,
      title: 'Kelahiran',
      value: formatNumber(getTotalKelahiran()),
      icon: '👶',
      color: '#8BC34A',
    },
    {
      id: 10,
      title: 'Kematian',
      value: formatNumber(getTotalKematian()),
      icon: '⚰️',
      color: '#607D8B',
    },
  ];

  // Membagi data menjadi 2 baris
  const baris1 = cardData.filter((_, index) => index % 2 === 0);
  const baris2 = cardData.filter((_, index) => index % 2 !== 0);

  // Ambil 3 forum terbaru
  const latestForums = forumData.slice(0, 3);

  const renderCard = item => (
    <View key={item.id} style={styles.containerCardStatistik}>
      <View style={[styles.cardStatistik, { borderLeftColor: item.color }]}>
        <View
          style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}
        >
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <Text style={styles.statistikValue}>{item.value}</Text>
        <Text style={styles.statistikTitle}>{item.title}</Text>
      </View>
    </View>
  );

  // Navigate to forum detail
  const navigateToForumDetail = item => {
    navigation.navigate('ForumDetails', { post: item });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageHeader />

      <View style={styles.containerPrd}>
        <Text style={styles.textNewPrd}>Statistik Penduduk</Text>
      </View>

      {/* Statistik Penduduk Cards - 2 Baris dalam 1 ScrollView */}
      <View style={styles.statistikContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            {/* Baris Pertama */}
            <View style={styles.rowContainer}>
              {baris1.map(item => renderCard(item))}
            </View>

            {/* Baris Kedua */}
            <View style={styles.rowContainer}>
              {baris2.map(item => renderCard(item))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Forum */}
      <View style={{ margin: 20 }}>
        <Text style={styles.textNewFrm}>Forum Terbaru</Text>
        {latestForums.map(item => {
          const hasImage =
            item.images && item.images.length > 0 && item.images[0];

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.containerCardFrm}
              onPress={() => navigateToForumDetail(item)}
            >
              {/* Tampilkan gambar jika ada */}
              {hasImage && (
                <View>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.imgFrm}
                  />
                </View>
              )}

              <View
                style={[
                  styles.containerTextFrm,
                  !hasImage && styles.containerTextFrmFull,
                ]}
              >
                {/* Title */}
                <Text style={styles.titleText} numberOfLines={2}>
                  {item.title}
                </Text>

                {/* Jika tidak ada gambar, tampilkan content */}
                {!hasImage && (
                  <Text numberOfLines={2} style={styles.contentText}>
                    {item.content}
                  </Text>
                )}

                {/* Author dan Time (ditampilkan untuk semua card) */}
                <View style={styles.metaContainer}>
                  <Text numberOfLines={1} style={styles.authorText}>
                    {item.author}
                  </Text>
                  <Text style={styles.dotSeparator}> • </Text>
                  <Text numberOfLines={1} style={styles.timeText}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    fontSize: 13,
  },
  containerPrd: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -15,
  },
  textNewPrd: {
    fontWeight: '500',
    fontSize: 18,
  },
  textViewMore: {
    fontWeight: 'medium',
    fontSize: 14,
    color: 'blue',
    marginTop: 20,
  },
  statistikContainer: {
    paddingLeft: 15,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerCardStatistik: {
    marginHorizontal: 7,
  },
  cardStatistik: {
    backgroundColor: 'white',
    borderRadius: 100,
    width: 130,
    height: 130,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 20,
  },
  statistikValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statistikTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  textNewFrm: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '500',
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
    justifyContent: 'center',
  },
  containerTextFrmFull: {
    marginLeft: 0,
    width: '100%',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  contentText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  authorText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  dotSeparator: {
    fontSize: 11,
    color: '#999',
    marginHorizontal: 4,
  },
  timeText: {
    fontSize: 11,
    color: '#999',
  },
});
