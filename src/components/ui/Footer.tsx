import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.item}>🏠 Início</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.item}>📍 Cidade</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.item}>⚙️ Config.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#fff',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },

  item: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
});