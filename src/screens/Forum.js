import { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { forumData } from '../data/DataForum';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Forum({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  // Toggle like
  const toggleLike = postId => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  // Navigate to detail
  const navigateToDetail = item => {
    navigation.navigate('ForumDetails', { post: item });
  };

  // Open image viewer
  const openImageViewer = image => {
    setSelectedImage(image);
    setImageModalVisible(true);
  };

  // Close image viewer
  const closeImageViewer = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };

  // Share function
  const handleShare = async (item, event) => {
    // Prevent navigation to detail
    if (event) {
      event.stopPropagation();
    }

    try {
      const result = await Share.share({
        message: `${item.title}\n\n${item.content}\n\nOleh: ${item.author}\n\nDibagikan dari Forum App`,
        title: item.title,
      });

      if (result.action === Share.sharedAction) {
        Alert.alert('Sukses', 'Postingan berhasil dibagikan!');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal membagikan postingan');
    }
  };

  // Render item forum
  const ForumItem = ({ item }) => {
    const isLiked = likedPosts.includes(item.id);
    const hasMultipleImages = item.images && item.images.length > 1;

    return (
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 16,
          marginTop: 12,
          borderRadius: 12,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        {/* Header */}
        <TouchableOpacity
          onPress={() => navigateToDetail(item)}
          activeOpacity={0.8}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Image
              source={{ uri: item.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                {item.author}
              </Text>
              <Text style={{ color: '#666', fontSize: 12 }}>{item.time}</Text>
            </View>
          </View>

          {/* Content */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
            {item.title}
          </Text>
          <Text
            style={{ color: '#333', fontSize: 14, lineHeight: 20 }}
            numberOfLines={3}
          >
            {item.content}
          </Text>
        </TouchableOpacity>

        {/* Images */}
        {item.images && item.images.length > 0 && (
          <>
            {hasMultipleImages ? (
              // Jika lebih dari 1 gambar, gunakan ScrollView horizontal
              <View style={{ marginTop: 12 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 8 }}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                >
                  {item.images.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openImageViewer(image)}
                      activeOpacity={0.9}
                    >
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: 220,
                          height: 160,
                          borderRadius: 8,
                          marginRight: 8,
                        }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {/* Indikator jumlah gambar */}
                <View
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 16,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    📷 {item.images.length}
                  </Text>
                </View>
              </View>
            ) : (
              // Jika 1 gambar, tampilkan dalam row biasa
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  gap: 8,
                }}
              >
                {item.images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openImageViewer(image)}
                    activeOpacity={0.9}
                    style={{ flex: 1 }}
                  >
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 220,
                        height: 160,
                        borderRadius: 8,
                        marginRight: 8,
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}

        {/* Footer */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              toggleLike(item.id);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}
          >
            <Image
              source={
                isLiked
                  ? require('../assets/love.png')
                  : require('../assets/un-love.png')
              }
              style={{ width: 20, height: 20, marginRight: 6 }}
            />
            <Text
              style={{
                color: isLiked ? '#018139' : '#666',
                fontWeight: '500',
                fontSize: 12,
              }}
            >
              {item.likes + (isLiked ? 1 : 0)} Menyukai
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}
            onPress={() => navigateToDetail(item)}
          >
            <Image
              source={require('../assets/Chat.png')}
              style={{ width: 20, height: 20, marginRight: 6 }}
            />
            <Text style={{ color: '#666', fontWeight: '500', fontSize: 12 }}>
              {item.comments} Komentar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={e => handleShare(item, e)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 16, marginRight: 4 }}>🔗</Text>
            <Text style={{ color: '#666', fontWeight: '500', fontSize: 12 }}>
              Bagikan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View
        style={{
          marginTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: '#d5d5d5ff',
          backgroundColor: 'white',
        }}
      >
        {/* forum umum */}
        <TouchableOpacity
          onPress={() => setActiveTab(0)}
          style={{
            width: '50%',
            padding: 20,
            borderBottomWidth: activeTab === 0 ? 2 : 0,
            borderBottomColor: activeTab === 0 ? '#018139' : 'white',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              color: activeTab === 0 ? '#018139' : 'gray',
            }}
          >
            Untuk Anda
          </Text>
        </TouchableOpacity>
        {/* forum disukai */}
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          style={{
            width: '50%',
            padding: 20,
            borderBottomWidth: activeTab === 1 ? 2 : 0,
            borderBottomColor: activeTab === 1 ? '#018139' : 'white',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              color: activeTab === 1 ? '#018139' : 'gray',
            }}
          >
            Menyukai
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2 MENU */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {activeTab === 0 ? (
          // Tab Untuk Anda - Semua Post
          <>
            {forumData.map(item => (
              <ForumItem key={item.id} item={item} />
            ))}
          </>
        ) : (
          // Tab Menyukai - Post yang disukai
          <>
            {likedPosts.length > 0 ? (
              forumData
                .filter(item => likedPosts.includes(item.id))
                .map(item => <ForumItem key={item.id} item={item} />)
            ) : (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <Text style={{ fontSize: 48, marginBottom: 16 }}>❤</Text>
                <Text
                  style={{ fontSize: 16, color: '#666', textAlign: 'center' }}
                >
                  Belum ada postingan yang Anda sukai
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#999',
                    textAlign: 'center',
                    marginTop: 8,
                  }}
                >
                  Tekan ikon hati pada postingan untuk menyukainya
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Modal untuk melihat gambar */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageViewer}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 40,
              right: 20,
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={closeImageViewer}
          >
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
              ×
            </Text>
          </TouchableOpacity>

          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity activeOpacity={1} onPress={closeImageViewer}>
              <Image
                source={{ uri: selectedImage }}
                style={{
                  width: screenWidth,
                  height: screenHeight * 0.8,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
