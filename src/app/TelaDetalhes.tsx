import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';

export default function TelaDetalhes() {
  return (
    <View style={styles.container}>

      <Navbar />

      <ScrollView>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1543059080-f9b1272213d5',
          }}
          style={styles.imagem}
        />

        <View style={styles.card}>
          <Text style={styles.temp}>
            28°
          </Text>

          <Text style={styles.clima}>
            🌤️ Parcialmente Nublado
          </Text>

          <Text style={styles.info}>
            💧 Umidade: 60%
          </Text>

          <Text style={styles.info}>
            🌬️ Vento: 12 km/h
          </Text>

          <Text style={styles.info}>
            🌡️ Sensação térmica: 30°
          </Text>
        </View>

        <Text style={styles.titulo}>
          Próximas Horas
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {['09h', '12h', '15h', '18h', '21h'].map(
            (hora) => (
              <View
                key={hora}
                style={styles.horaCard}
              >
                <Text>{hora}</Text>

                <Text style={{ fontSize: 30 }}>
                  ☀️
                </Text>

                <Text>28°</Text>
              </View>
            )
          )}
        </ScrollView>

        <Text style={styles.titulo}>
          Próximos Dias
        </Text>

        {[
          'Segunda',
          'Terça',
          'Quarta',
          'Quinta',
          'Sexta',
        ].map((dia) => (
          <View
            key={dia}
            style={styles.diaCard}
          >
            <Text>{dia}</Text>

            <Text>🌤️</Text>

            <Text>29° / 20°</Text>
          </View>
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

  imagem: {
    width: '100%',
    height: 220,
  },

  card: {
    backgroundColor: '#2196F3',

    margin: 15,
    padding: 20,

    borderRadius: 20,

    alignItems: 'center',
  },

  temp: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },

  clima: {
    color: '#fff',
    fontSize: 20,
  },

  info: {
    color: '#fff',
    marginTop: 5,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',

    marginHorizontal: 15,
    marginVertical: 10,
  },

  horaCard: {
    width: 90,

    backgroundColor: '#fff',

    marginLeft: 15,
    marginBottom: 10,

    padding: 15,

    borderRadius: 15,

    alignItems: 'center',
  },

  diaCard: {
    backgroundColor: '#fff',

    marginHorizontal: 15,
    marginBottom: 10,

    padding: 15,

    borderRadius: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});