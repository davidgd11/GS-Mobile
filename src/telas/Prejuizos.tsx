import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Prejuizos() {
  const [titulo, setTitulo] = useState('');
  const [prejuizo, setPrejuizo] = useState('');
  const navigation = useNavigation();

  const salvarPrejuizos = async () => {
    if (!titulo || !prejuizo) {
      Alert.alert('Campos obrigatórios', 'Preencha o título e a descrição dos prejuízos.');
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
      ultimoEvento.titulo = titulo;
      ultimoEvento.prejuizo = prejuizo;

      await AsyncStorage.setItem('eventos', JSON.stringify(eventos));

    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
      console.error(error);
    }
  };

  const irParaMenu = () => {
    navigation.navigate('Menu' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do desastre (ex: Chuva forte):</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Descreva os prejuízos observados:</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={prejuizo}
        onChangeText={setPrejuizo}
        placeholder="Ex: Residências sem energia, comércios fechados..."
        multiline
        numberOfLines={4}
      />

      <View style={{ marginTop: 16 }}>
        <Button title="Próximo" onPress={() => {irParaMenu();salvarPrejuizos();}} color= '#778899'/>
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
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});
