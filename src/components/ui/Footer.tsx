import { StyleSheet, Text, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <Text style={styles.title}>🌤️ ClimaApp</Text>

      <Text style={styles.text}>
        Previsão do tempo para suas cidades favoritas
      </Text>

      <Text style={styles.small}>
        © {new Date().getFullYear()} • Desenvolvido com React Native
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1976D2', // mesma cor da Navbar
    paddingVertical: 10, // menor altura
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  line: {
    width: '85%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginBottom: 6,
  },

  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  text: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    textAlign: 'center',
  },

  small: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    marginTop: 4,
  },
});