import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Forum() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: '#d5d5d5ff',
        }}
      >
        {/* ingredients */}
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
        {/* cooking steps */}
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
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {activeTab === 0 ? (
          <Text
            style={{
              marginLeft: 40,
              fontWeight: '500',
              width: '80%',
            }}
          >
            asdasdasd
          </Text>
        ) : (
          <Text style={{ marginLeft: 40, fontWeight: '500', width: '80%' }}>
            qweqweqweqwe
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
