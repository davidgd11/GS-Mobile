import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function RecomendacoesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recomendações em Caso de Falta de Energia</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Mantenha lanternas acessíveis</Text>
        <Text style={styles.cardText}>Evite o uso de velas para prevenir incêndios. Tenha pilhas carregadas.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Mantenha dispositivos carregados</Text>
        <Text style={styles.cardText}>Deixe seu celular e power banks carregados para emergências.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Evite abrir geladeira/freezer</Text>
        <Text style={styles.cardText}>Manter a porta fechada conserva os alimentos por mais tempo.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Acompanhe notícias por rádio</Text>
        <Text style={styles.cardText}>Use rádios a pilha ou apps com pouca bateria para se manter informado.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Desligue aparelhos eletrônicos</Text>
        <Text style={styles.cardText}>Evita danos quando a energia voltar. Principalmente TVs, PCs e eletrodomésticos.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Evacue em caso de risco</Text>
        <Text style={styles.cardText}>Se houver alagamento ou risco estrutural, busque abrigo seguro imediatamente.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor:'#B0C4DE'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    marginTop: 12,
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d47a1',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
});
