import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';

export default function TelaDetalhes() {
  const { nome, temperatura, clima } = useLocalSearchParams();

  // 🔥 normalização segura
  const nomeCidade = Array.isArray(nome) ? nome[0] : nome ?? '';
  const temp = Array.isArray(temperatura) ? temperatura[0] : temperatura ?? '';
  const climaTexto = Array.isArray(clima) ? clima[0] : clima ?? '';

  function getIconeClima(clima: string) {
    const c = clima.toLowerCase();

    if (c.includes('chuva')) return '🌧️';
    if (c.includes('nublado')) return '☁️';
    if (c.includes('parcialmente')) return '⛅';
    if (c.includes('ensolarado')) return '☀️';
    if (c.includes('tempest')) return '⛈️';
    if (c.includes('neve')) return '❄️';

    return '🌤️';
  }

  function getImagemCidade(nomeCidade: string) {
    const c = nomeCidade.toLowerCase();

    if (c.includes('são paulo')) {
      return 'https://www.direcional.com.br/wp-content/uploads/2020/08/sao-paulo-cidade.jpg';
    }

    if (c.includes('rio de janeiro')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/1280px-Cidade_Maravilhosa.jpg';
    }

    if (c.includes('curitiba')) {
      return 'https://media.staticontent.com/media/pictures/04641818-297a-4f28-b635-b15e2fb31087';
    }

    return 'https://media.staticontent.com/media/pictures/04641818-297a-4f28-b635-b15e2fb31087';
  }

  const icone = getIconeClima(climaTexto);
  const imagemCidade = getImagemCidade(nomeCidade);

  return (
    <View style={styles.container}>

      <Navbar mostrarBusca={false} />

      <ScrollView>

        <Image
          source={{ uri: imagemCidade }}
          style={styles.imagem}
        />

        <View style={styles.card}>

          <Text style={styles.cidade}>
            {nomeCidade}
          </Text>

          <Text style={styles.icone}>
            {icone}
          </Text>

          <Text style={styles.temp}>
            {temp}
          </Text>

          <Text style={styles.clima}>
            {climaTexto}
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.info}>💧 Umidade: 60%</Text>
            <Text style={styles.info}>🌬️ Vento: 12 km/h</Text>
            <Text style={styles.info}>🌡️ Sensação térmica: 30°</Text>
          </View>

        </View>

        <Text style={styles.titulo}>Próximas Horas</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['09h', '12h', '15h', '18h', '21h'].map((hora) => (
            <View key={hora} style={styles.horaCard}>
              <Text>{hora}</Text>
              <Text style={styles.horaIcone}>{icone}</Text>
              <Text>{temp}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.titulo}>Próximos Dias</Text>

        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((dia) => (
          <View key={dia} style={styles.diaCard}>
            <Text>{dia}</Text>
            <Text>{icone}</Text>
            <Text>{temp} / 20°</Text>
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

  cidade: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  icone: {
    fontSize: 70,
    marginVertical: 10,
  },

  temp: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#fff',
  },

  clima: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },

  infoBox: {
    marginTop: 10,
    alignItems: 'center',
  },

  info: {
    color: '#fff',
    marginTop: 4,
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
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  horaIcone: {
    fontSize: 28,
    marginVertical: 5,
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