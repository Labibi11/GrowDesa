import LinearGradient from 'react-native-linear-gradient';

function Background({ children }) {
  return (
    <LinearGradient
      colors={['#fff', '#fff', '#018109']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      {' '}
      {children}
    </LinearGradient>
  );
}

export default Background;
