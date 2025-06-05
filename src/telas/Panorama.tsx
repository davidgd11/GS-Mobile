import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Evento {
  titulo: string;
  prejuizo: string;
  localizacao: string;
  tempo: string;
}

export default function Panorama() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const json = await AsyncStorage.getItem('eventos');
        if (json) {
          const dados: Evento[] = JSON.parse(json);
          setEventos(dados);
        }
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    carregarEventos();
  }, []);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {eventos.length === 0 ? (
        <Text style={styles.textoNenhum}>Nenhum evento registrado.</Text>
      ) : (
        eventos.slice().reverse().map((evento, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.titulo}>{evento.titulo}</Text>
            <Text style={styles.texto}>Prejuízo: {evento.prejuizo}</Text>
            <Text style={styles.texto}>Localização: {evento.localizacao}</Text>
            <Text style={styles.texto}>Tempo de interrupção: {evento.tempo}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor:'#B0C4DE'
  },
  scroll: {
  flex: 1,
  backgroundColor: '#B0C4DE',
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
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  texto: {
    fontSize: 13,
    color: '#000',
    marginBottom: 4,
  },
  textoNenhum: {
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
});
