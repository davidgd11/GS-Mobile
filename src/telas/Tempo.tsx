import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Tempo() {
  const [tempo, setTempo] = useState('');
  const navigation = useNavigation();

  const salvarTempo = async () => {
    if (!tempo) {
      Alert.alert('Campo obrigatório', 'Por favor, informe o tempo de interrupção.');
      return;
    }

    try {
      const eventosJson = await AsyncStorage.getItem('eventos');
      const eventos = eventosJson ? JSON.parse(eventosJson) : [];

      if (eventos.length === 0) {
        Alert.alert('Erro', 'Nenhum evento encontrado para atualizar.');
        return;
      }

      const ultimoEvento = eventos[eventos.length - 1];
      ultimoEvento.tempo = tempo;

      await AsyncStorage.setItem('eventos', JSON.stringify(eventos));
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
      console.error(error);
    }
  };

  const irParaProxima = () => {
    navigation.navigate('Prejuizos' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quanto tempo a região ficou sem energia?</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 2 horas"
        value={tempo}
        onChangeText={setTempo}
      />

      <View style={{ marginTop: 16 }}>
        <Button title="Próximo" onPress={() => {irParaProxima();salvarTempo();}} color= '#778899'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor:'#B0C4DE'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: { 
    padding: 8,
    borderRadius: 6,
    marginTop: 18,
    backgroundColor: '#f2f2f2',
  },
});
