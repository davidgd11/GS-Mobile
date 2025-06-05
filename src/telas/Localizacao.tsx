import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Localizacao() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [mostrarCamposManuais, setMostrarCamposManuais] = useState(false);
  const navigation = useNavigation();

  const buscarCep = async () => {
    if (cep.length !== 8) {
      Alert.alert('CEP inválido', 'Digite um CEP com 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
      } else {
        setLogradouro(data.logradouro || '');
        setBairro(data.bairro || '');

        const eventoParcial = {
          localizacao: `${data.logradouro}, ${data.bairro}`,
        };

        const eventosJson = await AsyncStorage.getItem('eventos');
        const eventos = eventosJson ? JSON.parse(eventosJson) : [];

        eventos.push(eventoParcial);
        await AsyncStorage.setItem('eventos', JSON.stringify(eventos));
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar o CEP.');
      console.error(error);
    }
  };

  const salvarManual = async () => {
    if (!logradouro || !bairro) {
      Alert.alert('Erro', 'Preencha a rua e o bairro.');
      return;
    }

    const eventoParcial = {
      localizacao: `${logradouro}, ${bairro}`,
    };

    const eventosJson = await AsyncStorage.getItem('eventos');
    const eventos = eventosJson ? JSON.parse(eventosJson) : [];

    eventos.push(eventoParcial);
    await AsyncStorage.setItem('eventos', JSON.stringify(eventos));

    irParaProxima();
  };

  const irParaProxima = () => {
    navigation.navigate('Tempo' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite o CEP:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 01001000"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
      />
      <Button title="Buscar" onPress={buscarCep} color="#778899" />

      <View style={{ marginTop: 12 }}>
        <Button
          title="Não sei meu CEP"
          onPress={() => setMostrarCamposManuais(true)}
          color="#808080"
        />
      </View>

      {logradouro !== '' && !mostrarCamposManuais && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>Rua/Av.: {logradouro}</Text>
          <Text style={styles.resultadoTexto}>Bairro: {bairro}</Text>
          <Button title="Próximo" onPress={irParaProxima} color="#778899" />
        </View>
      )}

      {mostrarCamposManuais && (
        <View style={styles.resultado}>
          <TextInput
            style={styles.input}
            placeholder="Digite a Rua"
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite o Bairro"
            value={bairro}
            onChangeText={setBairro}
          />
          <Button title="Próximo" onPress={salvarManual} color="#778899" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#B0C4DE',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontWeight: 'bold',
    padding: 6,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
  },
  resultado: {
    marginTop: 28,
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 6,
  },
  resultadoTexto: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
});
