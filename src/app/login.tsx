import { Platform } from 'react-native';

export default function Login() {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <iframe
      src="http://localhost:3000/index.html"
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title="Login"
    />
  );
}