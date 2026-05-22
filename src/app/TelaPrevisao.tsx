import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function TelaPrevisao() {
  const previsao = [
    { dia: 'Seg', temp: '26°C' },
    { dia: 'Ter', temp: '28°C' },
    { dia: 'Qua', temp: '24°C' },
    { dia: 'Qui', temp: '27°C' },
    { dia: 'Sex', temp: '29°C' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* CARD PRINCIPAL */}
        <View style={styles.card}>
          
          {/* CIDADE */}
          <Text style={styles.cidade}>Matão - SP</Text>

          {/* TEMPERATURA */}
          <Text style={styles.temperatura}>27°C</Text>

          {/* DETALHES */}
          <View style={styles.infoContainer}>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitulo}>Chuva</Text>
              <Text style={styles.infoValor}>80%</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitulo}>Umidade</Text>
              <Text style={styles.infoValor}>72%</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitulo}>Vento</Text>
              <Text style={styles.infoValor}>15 km/h</Text>
            </View>

          </View>

          {/* PREVISÃO 5 DIAS */}
          <Text style={styles.previsaoTitulo}>
            Próximos 5 dias
          </Text>

          <View style={styles.previsaoContainer}>
            {previsao.map((item, index) => (
              <View key={index} style={styles.previsaoCard}>
                <Text style={styles.previsaoDia}>
                  {item.dia}
                </Text>

                <Text style={styles.previsaoTemp}>
                  {item.temp}
                </Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFE9FF',
  },

  card: {
    width: '100%',
    height: height * 0.4,
    backgroundColor: '#8ED6FF',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 50,
    paddingHorizontal: 25,
    elevation: 8,
  },

  cidade: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  temperatura: {
    fontSize: 72,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },

  infoBox: {
    width: '30%',
    backgroundColor: '#A8E1FF',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },

  infoTitulo: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  infoValor: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },

  previsaoTitulo: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },

  previsaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  previsaoCard: {
    backgroundColor: '#A8E1FF',
    width: 55,
    height: 80,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  previsaoDia: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  previsaoTemp: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});