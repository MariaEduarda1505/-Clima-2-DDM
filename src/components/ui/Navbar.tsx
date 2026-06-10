import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type NavbarProps = {
  onBuscarCidade?: (cidade: string) => void;
  mostrarBusca?: boolean;
};

export default function Navbar({
  onBuscarCidade,
  mostrarBusca = true,
}: NavbarProps) {
  const [cidade, setCidade] = useState('');

  function buscar() {
    if (cidade.trim() !== '' && onBuscarCidade) {
      onBuscarCidade(cidade);
      setCidade('');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🌤️ ClimaApp
      </Text>

      {/* 🔥 BUSCA CONDICIONAL */}
      {mostrarBusca && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma cidade..."
            value={cidade}
            onChangeText={setCidade}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={buscar}
          >
            <Text style={styles.buttonText}>
              Buscar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1976D2',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  searchContainer: {
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
  },

  button: {
    backgroundColor: '#0D47A1',
    marginLeft: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});