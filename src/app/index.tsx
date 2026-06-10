import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';

export default function Index() {
  const [cidadeAtual, setCidadeAtual] = useState('Matão - SP');

  const [temperatura, setTemperatura] = useState('28°');
  const [clima, setClima] = useState('Parcialmente Nublado');

  const [umidade, setUmidade] = useState('65%');
  const [vento, setVento] = useState('12 km/h');
  const [sensacao, setSensacao] = useState('30°');

  function buscarCidade(nomeCidade: string) {
    setCidadeAtual(nomeCidade);

    const cidade = nomeCidade.toLowerCase();

    if (cidade === 'são paulo') {
      setTemperatura('24°');
      setClima('Nublado');
      setUmidade('72%');
      setVento('10 km/h');
      setSensacao('26°');
    } else if (cidade === 'rio de janeiro') {
      setTemperatura('32°');
      setClima('Ensolarado');
      setUmidade('55%');
      setVento('18 km/h');
      setSensacao('36°');
    } else if (cidade === 'curitiba') {
      setTemperatura('18°');
      setClima('Chuvoso');
      setUmidade('85%');
      setVento('14 km/h');
      setSensacao('16°');
    } else {
      setTemperatura('26°');
      setClima('Parcialmente Nublado');
      setUmidade('65%');
      setVento('12 km/h');
      setSensacao('28°');
    }
  }

  const cidades = [
    { nome: 'São Paulo', temperatura: '24°', clima: 'Nublado', icone: '☁️' },
    { nome: 'Rio de Janeiro', temperatura: '32°', clima: 'Ensolarado', icone: '☀️' },
    { nome: 'Curitiba', temperatura: '18°', clima: 'Chuvoso', icone: '🌧️' },
  ];

  // 🔥 FUNÇÃO RESTAURADA (NAVEGAÇÃO CORRETA)
  function abrirDetalhes(cidade: any) {
    router.push({
      pathname: '/TelaDetalhes',
      params: {
        nome: cidade.nome,
        temperatura: cidade.temperatura,
        clima: cidade.clima,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Navbar onBuscarCidade={buscarCidade} />

      <ScrollView>

        {/* CARD PRINCIPAL */}
        <View style={styles.cardPrincipal}>
          <Text style={styles.cidade}>{cidadeAtual}</Text>

          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
            }}
            style={styles.icone}
          />

          <Text style={styles.temp}>{temperatura}</Text>
          <Text style={styles.desc}>{clima}</Text>

          <View style={styles.detalhes}>
            <Text style={styles.info}>💧 {umidade}</Text>
            <Text style={styles.info}>💨 {vento}</Text>
            <Text style={styles.info}>🌡️ {sensacao}</Text>
          </View>
        </View>

        {/* OUTRAS CIDADES (AGORA COM NAVEGAÇÃO REAL) */}
        <Text style={styles.titulo}>Outras cidades</Text>

        {cidades.map((cidade, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardCidade}
            onPress={() => abrirDetalhes(cidade)}   // 🔥 AQUI VOLTOU A CONEXÃO
          >
            <Text style={styles.emoji}>{cidade.icone}</Text>

            <View>
              <Text style={styles.nome}>{cidade.nome}</Text>
              <Text>{cidade.clima}</Text>
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
    width: 110,
    height: 110,
    marginVertical: 10,
  },

  temp: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },

  desc: {
    color: '#fff',
    fontSize: 18,
  },

  detalhes: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },

  info: {
    color: '#fff',
    fontSize: 12,
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
    fontSize: 30,
  },

  nome: {
    fontWeight: 'bold',
  },

  tempCidade: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
  },
});