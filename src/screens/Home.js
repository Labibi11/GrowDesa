import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Home() {
  console.log('Home screen rendered');

  return (
    <LinearGradient
      colors={['#fff', '#fff', '#018129']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ color: 'black', fontSize: 20 }}>Home</Text>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
});

export default Home;
