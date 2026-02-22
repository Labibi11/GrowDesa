import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { commentsData } from '../data/DataForum';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ForumDetails({ route, navigation }) {
  const { post } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  // Ambil komentar dari data berdasarkan post.id
  const [comments, setComments] = useState(commentsData[post.id] || []);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
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
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${post.title}\n\n${post.content}\n\nDibagikan dari Forum App`,
        title: post.title,
      });

      if (result.action === Share.sharedAction) {
        Alert.alert('Sukses', 'Postingan berhasil dibagikan!');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal membagikan postingan');
    }
  };

  // Post comment
  const handlePostComment = () => {
    if (comment.trim() === '') {
      Alert.alert('Perhatian', 'Komentar tidak boleh kosong');
      return;
    }

    const newComment = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://i.pravatar.cc/150?img=8',
      time: 'Baru saja',
      content: comment,
    };

    setComments([...comments, newComment]);
    setComment('');
    Alert.alert('Sukses', 'Komentar berhasil ditambahkan!');
  };

  const CommentItem = ({ comment }) => (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: comment.avatar }}
          style={{ width: 36, height: 36, borderRadius: 18 }}
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 4 }}>
            {comment.author}
          </Text>
          <Text
            style={{
              color: '#333',
              fontSize: 13,
              lineHeight: 18,
              marginBottom: 8,
            }}
          >
            {comment.content}
          </Text>
          <Text style={{ color: '#999', fontSize: 12 }}>{comment.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 20,
          paddingBottom: 16,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}
        >
          <Image
            source={require('../assets/arrow_left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>FORUM</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Post Content */}
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            marginBottom: 8,
          }}
        >
          {/* Author Info */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Image
              source={{ uri: post.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                {post.author}
              </Text>
              <Text style={{ color: '#666', fontSize: 12 }}>{post.time}</Text>
            </View>
          </View>

          {/* Post Title */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
            {post.title}
          </Text>

          {/* Post Content */}
          <Text style={{ color: '#333', fontSize: 14, lineHeight: 20 }}>
            {post.content}
          </Text>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <>
              {post.images.length > 2 ? (
                // Jika lebih dari 2 gambar, gunakan ScrollView horizontal
                <View style={{ marginTop: 12 }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 8 }}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                  >
                    {post.images.map((image, index) => (
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
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    >
                      📷 {post.images.length}
                    </Text>
                  </View>
                </View>
              ) : (
                // Jika 1-2 gambar, tampilkan dalam row biasa
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 12,
                    gap: 8,
                  }}
                >
                  {post.images.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openImageViewer(image)}
                      activeOpacity={0.9}
                      style={{ flex: 1 }}
                    >
                      <Image
                        source={{ uri: image }}
                        style={{ width: '100%', height: 120, borderRadius: 8 }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}

          {/* Action Buttons */}
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
              onPress={toggleLike}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 16,
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
                {likesCount} Menyukai
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 16,
              }}
            >
              <Image
                source={require('../assets/Chat.png')}
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
              <Text style={{ color: '#666', fontWeight: '500', fontSize: 12 }}>
                {comments.length} Komentar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShare}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 16, marginRight: 4 }}>🔗</Text>
              <Text style={{ color: '#666', fontWeight: '500', fontSize: 12 }}>
                Bagikan
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments Section */}
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>
            Komentar ({comments.length})
          </Text>

          {comments.length > 0 ? (
            comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: '#999' }}>
                Belum ada komentar. Jadilah yang pertama berkomentar!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=8' }}
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 12 }}
        />
        <TextInput
          style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginRight: 8,
          }}
          placeholder="Tambahkan komentar..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity
          onPress={handlePostComment}
          style={{
            backgroundColor: '#018139',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '500' }}>Kirim</Text>
        </TouchableOpacity>
      </View>

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

const styles = StyleSheet.create({
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
});
