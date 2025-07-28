import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Background({ children }) {
  return (
    <LinearGradient
      colors={['#fff', '#fff', '#018129']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      {' '}
      {children}
    </LinearGradient>
  );
}

export default Background;
