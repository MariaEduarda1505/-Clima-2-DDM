import { router, useLocalSearchParams } from 'expo-router';
import {
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';

type SemanaInfo = {
  semana: string;
  temp: number;
  chuva: number;
};

export default function TelaTendencia() {
  const { nome, temperatura, clima } = useLocalSearchParams();

  const nomeCidade =
    typeof nome === 'string'
      ? nome
      : Array.isArray(nome)
      ? nome[0]
      : 'Cidade não informada';

  const tempAtual =
    typeof temperatura === 'string'
      ? temperatura
      : Array.isArray(temperatura)
      ? temperatura[0]
      : '26°';

  const climaTexto =
    typeof clima === 'string'
      ? clima
      : Array.isArray(clima)
      ? clima[0]
      : 'Parcialmente Nublado';

  function getIconeClima(textoClima: string) {
    const c = textoClima.toLowerCase();

    if (c.includes('parcialmente')) return '⛅';
    if (c.includes('chuva') || c.includes('chuvoso') || c.includes('chuvosa')) return '🌧️';
    if (c.includes('nublado')) return '☁️';
    if (c.includes('ensolarado') || c.includes('ensolarada') || c.includes('sol')) return '☀️';
    if (c.includes('tempest')) return '⛈️';
    if (c.includes('neve')) return '❄️';

    return '🌤️';
  }

  function converterTemperatura(temp: string) {
    const numero = parseInt(temp.replace('°', ''), 10);
    return Number.isNaN(numero) ? 26 : numero;
  }

  function gerarTendencia(climaAtual: string, tempBaseString: string): SemanaInfo[] {
    const tempBase = converterTemperatura(tempBaseString);
    const clima = climaAtual.toLowerCase();

    if (clima.includes('ensolarado') || clima.includes('sol')) {
      return [
        { semana: '1ª sem.', temp: tempBase + 2, chuva: 10 },
        { semana: '2ª sem.', temp: tempBase + 1, chuva: 15 },
        { semana: '3ª sem.', temp: tempBase + 1, chuva: 20 },
        { semana: '4ª sem.', temp: tempBase + 2, chuva: 10 },
      ];
    }

    if (clima.includes('chuva') || clima.includes('chuvoso') || clima.includes('chuvosa')) {
      return [
        { semana: '1ª sem.', temp: tempBase - 1, chuva: 70 },
        { semana: '2ª sem.', temp: tempBase, chuva: 80 },
        { semana: '3ª sem.', temp: tempBase - 1, chuva: 65 },
        { semana: '4ª sem.', temp: tempBase, chuva: 55 },
      ];
    }

    if (clima.includes('nublado')) {
      return [
        { semana: '1ª sem.', temp: tempBase, chuva: 35 },
        { semana: '2ª sem.', temp: tempBase + 1, chuva: 45 },
        { semana: '3ª sem.', temp: tempBase, chuva: 40 },
        { semana: '4ª sem.', temp: tempBase - 1, chuva: 30 },
      ];
    }

    return [
      { semana: '1ª sem.', temp: tempBase + 1, chuva: 20 },
      { semana: '2ª sem.', temp: tempBase, chuva: 60 },
      { semana: '3ª sem.', temp: tempBase - 1, chuva: 40 },
      { semana: '4ª sem.', temp: tempBase + 1, chuva: 15 },
    ];
  }

  function getResumoDoMes(climaAtual: string) {
    const c = climaAtual.toLowerCase();

    if (c.includes('ensolarado') || c.includes('sol')) {
      return 'Mês com calor predominante e baixa chance de chuva.';
    }

    if (c.includes('chuva') || c.includes('chuvoso') || c.includes('chuvosa')) {
      return 'Mês mais úmido, com maior frequência de chuva ao longo das semanas.';
    }

    if (c.includes('nublado')) {
      return 'Mês com temperaturas amenas e variação moderada de chuva.';
    }

    return 'Mês com temperaturas estáveis e aumento de chuva no meio do período.';
  }

  const dadosSemanais = gerarTendencia(climaTexto, tempAtual);
  const icone = getIconeClima(climaTexto);
  const resumo = getResumoDoMes(climaTexto);

  const semanaMaisQuente = dadosSemanais.reduce((maior, atual) =>
    atual.temp > maior.temp ? atual : maior
  );

  const semanaMaisChuvosa = dadosSemanais.reduce((maior, atual) =>
    atual.chuva > maior.chuva ? atual : maior
  );

  const maiorTemperatura = Math.max(...dadosSemanais.map((item) => item.temp));
  const alturaMaxima = 140;

  async function compartilharTendencia() {
    const mensagem = `📅 Tendência do mês em ${nomeCidade}

Clima atual: ${icone} ${climaTexto}
Temperatura atual: ${tempAtual}

Temperatura média por semana:
• ${dadosSemanais[0].semana}: ${dadosSemanais[0].temp}°
• ${dadosSemanais[1].semana}: ${dadosSemanais[1].temp}°
• ${dadosSemanais[2].semana}: ${dadosSemanais[2].temp}°
• ${dadosSemanais[3].semana}: ${dadosSemanais[3].temp}°

Chuva prevista:
• ${dadosSemanais[0].semana}: ${dadosSemanais[0].chuva}%
• ${dadosSemanais[1].semana}: ${dadosSemanais[1].chuva}%
• ${dadosSemanais[2].semana}: ${dadosSemanais[2].chuva}%
• ${dadosSemanais[3].semana}: ${dadosSemanais[3].chuva}%

Destaques do mês:
🔥 Semana mais quente: ${semanaMaisQuente.semana}
🌧️ Maior chance de chuva: ${semanaMaisChuvosa.semana}

${resumo}`;

    try {
      await Share.share({
        message: mensagem,
        title: `Tendência do mês - ${nomeCidade}`,
      });
    } catch (error) {
      console.log('Erro ao compartilhar:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Navbar mostrarBusca={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* BOTÕES SUPERIORES */}
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
            <Text style={styles.textoVoltar}>← Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCompartilhar}
            onPress={compartilharTendencia}
          >
            <Text style={styles.textoCompartilhar}>Compartilhar</Text>
          </TouchableOpacity>
        </View>

        {/* CARD RESUMO */}
        <View style={styles.cardResumo}>
          <Text style={styles.titulo}>Tendência do Mês</Text>
          <Text style={styles.cidade}>{nomeCidade}</Text>

          <Text style={styles.icone}>{icone}</Text>

          <Text style={styles.clima}>{climaTexto}</Text>

          <Text style={styles.resumo}>{resumo}</Text>
        </View>

        {/* GRÁFICO DE TEMPERATURA */}
        <Text style={styles.subtitulo}>Temperatura média por semana</Text>

        <View style={styles.cardGrafico}>
          <View style={styles.graficoContainer}>
            {dadosSemanais.map((item) => {
              const alturaBarra = (item.temp / maiorTemperatura) * alturaMaxima;

              return (
                <View key={item.semana} style={styles.colunaGrafico}>
                  <Text style={styles.valorTemp}>{item.temp}°</Text>

                  <View
                    style={[
                      styles.barra,
                      {
                        height: alturaBarra,
                        backgroundColor:
                          item.temp === maiorTemperatura ? '#FFC107' : '#90CAF9',
                      },
                    ]}
                  />

                  <Text style={styles.labelSemana}>{item.semana}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* CHUVA PREVISTA */}
        <Text style={styles.subtitulo}>Chuva prevista</Text>

        <View style={styles.cardChuva}>
          {dadosSemanais.map((item) => (
            <View key={item.semana} style={styles.miniCardChuva}>
              <Text style={styles.semanaChuva}>{item.semana}</Text>
              <Text style={styles.valorChuva}>🌧️ {item.chuva}%</Text>
            </View>
          ))}
        </View>

        {/* DESTAQUES */}
        <Text style={styles.subtitulo}>Destaques do mês</Text>

        <View style={styles.cardDestaque}>
          <Text style={styles.textoDestaque}>
            🔥 Semana mais quente: {semanaMaisQuente.semana}
          </Text>

          <Text style={styles.textoDestaque}>
            🌧️ Maior chance de chuva: {semanaMaisChuvosa.semana}
          </Text>
        </View>
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
    paddingBottom: 30,
  },

  topButtons: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  botaoVoltar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  textoVoltar: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 15,
  },

  botaoCompartilhar: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  textoCompartilhar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  cardResumo: {
    backgroundColor: '#2196F3',
    margin: 15,
    marginTop: 12,
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
  },

  titulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },

  cidade: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  icone: {
    fontSize: 62,
    marginVertical: 10,
  },

  clima: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },

  resumo: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 10,
    color: '#111',
  },

  cardGrafico: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 18,
    padding: 20,
    borderRadius: 18,
  },

  graficoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 220,
  },

  colunaGrafico: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  valorTemp: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },

  barra: {
    width: 42,
    borderRadius: 12,
  },

  labelSemana: {
    marginTop: 10,
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },

  cardChuva: {
    marginHorizontal: 15,
    marginBottom: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  miniCardChuva: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
  },

  semanaChuva: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

  valorChuva: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 16,
  },

  cardDestaque: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 18,
    borderRadius: 18,
    marginBottom: 10,
  },

  textoDestaque: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '500',
  },
});