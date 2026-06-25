import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';

type Cidade = {
  nome: string;
  temperatura: string;
  clima: string;
  icone: string;
};

export default function Index() {
  const [cidadeAtual, setCidadeAtual] = useState('Matão - SP');
  const [temperatura, setTemperatura] = useState('28°');
  const [clima, setClima] = useState('Parcialmente Nublado');
  const [umidade, setUmidade] = useState('65%');
  const [vento, setVento] = useState('12 km/h');
  const [sensacao, setSensacao] = useState('30°');

  const cidades: Cidade[] = [
    {
      nome: 'São Paulo',
      temperatura: '24°',
      clima: 'Nublado',
      icone: '☁️',
    },
    {
      nome: 'Rio de Janeiro',
      temperatura: '32°',
      clima: 'Ensolarado',
      icone: '☀️',
    },
    {
      nome: 'Curitiba',
      temperatura: '18°',
      clima: 'Chuvoso',
      icone: '🌧️',
    },
  ];

  function getIconeClima(climaTexto: string) {
    const c = climaTexto.toLowerCase();

    if (c.includes('parcialmente')) return '⛅';
    if (c.includes('chuva') || c.includes('chuvoso') || c.includes('chuvosa')) return '🌧️';
    if (c.includes('nublado')) return '☁️';
    if (c.includes('ensolarado') || c.includes('ensolarada') || c.includes('sol')) return '☀️';
    if (c.includes('tempest')) return '⛈️';
    if (c.includes('neve')) return '❄️';

    return '🌤️';
  }

  function buscarCidade(nomeCidade: string) {
    const cidadeDigitada = nomeCidade.trim();
    const cidade = cidadeDigitada.toLowerCase();

    setCidadeAtual(cidadeDigitada);

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
    } else if (
      cidade === 'matão' ||
      cidade === 'matão - sp' ||
      cidade === 'matao' ||
      cidade === 'matao - sp'
    ) {
      setCidadeAtual('Matão - SP');
      setTemperatura('28°');
      setClima('Parcialmente Nublado');
      setUmidade('65%');
      setVento('12 km/h');
      setSensacao('30°');
    } else {
      // cidade genérica
      setTemperatura('26°');
      setClima('Parcialmente Nublado');
      setUmidade('65%');
      setVento('12 km/h');
      setSensacao('28°');
    }
  }

  function abrirDetalhes(cidade: Cidade) {
    router.push({
      pathname: '/TelaDetalhes',
      params: {
        nome: cidade.nome,
        temperatura: cidade.temperatura,
        clima: cidade.clima,
      },
    });
  }

  function abrirTendencia() {
    router.push({
      pathname: '/TelaTendencia',
      params: {
        nome: cidadeAtual,
        temperatura,
        clima,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Navbar onBuscarCidade={buscarCidade} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* CARD PRINCIPAL */}
        <View style={styles.cardPrincipal}>
          <Text style={styles.cidade}>{cidadeAtual}</Text>

          <Text style={styles.iconeClima}>
            {getIconeClima(clima)}
          </Text>

          <Text style={styles.temp}>{temperatura}</Text>

          <Text style={styles.desc}>{clima}</Text>

          <View style={styles.detalhes}>
            <Text style={styles.info}>💧 {umidade}</Text>
            <Text style={styles.info}>💨 {vento}</Text>
            <Text style={styles.info}>🌡️ {sensacao}</Text>
          </View>

          {/* BOTÃO PARA A TELA DE TENDÊNCIA */}
          <TouchableOpacity
            style={styles.botaoTendencia}
            onPress={abrirTendencia}
            activeOpacity={0.85}
          >
            <Text style={styles.textoBotaoTendencia}>
              Ver tendência do mês
            </Text>
          </TouchableOpacity>
        </View>

        {/* OUTRAS CIDADES */}
        <Text style={styles.titulo}>Outras cidades</Text>

        {cidades.map((cidade, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardCidade}
            onPress={() => abrirDetalhes(cidade)}
            activeOpacity={0.85}
          >
            <Text style={styles.emoji}>{cidade.icone}</Text>

            <View style={styles.infoCidade}>
              <Text style={styles.nome}>{cidade.nome}</Text>
              <Text style={styles.climaCidade}>{cidade.clima}</Text>
            </View>

            <Text style={styles.tempCidade}>{cidade.temperatura}</Text>
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

  scrollContent: {
    paddingBottom: 20,
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
    textAlign: 'center',
  },

  iconeClima: {
    fontSize: 80,
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
    textAlign: 'center',
  },

  detalhes: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  info: {
    color: '#fff',
    fontSize: 12,
  },

  botaoTendencia: {
    marginTop: 18,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  textoBotaoTendencia: {
    color: '#1976D2',
    fontSize: 15,
    fontWeight: 'bold',
  },

  titulo: {
    marginHorizontal: 15,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },

  cardCidade: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 30,
    marginRight: 14,
  },

  infoCidade: {
    flex: 1,
  },

  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },

  climaCidade: {
    color: '#666',
    marginTop: 2,
  },

  tempCidade: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
  },
});