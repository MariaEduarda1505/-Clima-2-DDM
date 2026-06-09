import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';

export default function Index() {
  const cidades = [
    {
      nome: 'São Paulo',
      temperatura: '28°',
      clima: 'Parcialmente Nublado',
      icone: '🌤️',
    },
    {
      nome: 'Rio de Janeiro',
      temperatura: '32°',
      clima: 'Ensolarado',
      icone: '☀️',
    },
    {
      nome: 'Curitiba',
      temperatura: '19°',
      clima: 'Chuvoso',
      icone: '🌧️',
    },
  ];

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView>

        <View style={styles.cardPrincipal}>
          <Text style={styles.cidade}>
            Matão - SP
          </Text>

          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
            }}
            style={styles.icone}
          />

          <Text style={styles.temp}>
            28°
          </Text>

          <Text style={styles.desc}>
            Parcialmente Nublado
          </Text>
        </View>

        <Text style={styles.titulo}>
          Outras cidades
        </Text>

        {cidades.map((cidade, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardCidade}
            onPress={() =>
              router.push('/TelaDetalhes')
            }
          >
            <Text style={styles.emoji}>
              {cidade.icone}
            </Text>

            <View>
              <Text style={styles.nomeCidade}>
                {cidade.nome}
              </Text>

              <Text>
                {cidade.clima}
              </Text>
            </View>

            <Text style={styles.tempCidade}>
              {cidade.temperatura}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FF',
  },

  cardPrincipal: {
    backgroundColor: '#2196F3',

    margin: 15,
    padding: 20,

    borderRadius: 20,

    alignItems: 'center',
  },

  cidade: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  icone: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },

  temp: {
    color: '#fff',
    fontSize: 55,
    fontWeight: 'bold',
  },

  desc: {
    color: '#fff',
    fontSize: 18,
  },

  titulo: {
    marginHorizontal: 15,
    marginBottom: 10,

    fontSize: 20,
    fontWeight: 'bold',
  },

  cardCidade: {
    backgroundColor: '#fff',

    marginHorizontal: 15,
    marginBottom: 10,

    padding: 15,

    borderRadius: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 35,
  },

  nomeCidade: {
    fontWeight: 'bold',
  },

  tempCidade: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976D2',
  },
});