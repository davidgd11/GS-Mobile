import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Panorama: undefined;
  Localizacao: undefined;
  Tempo: undefined;
  Prejuizos: undefined;
  Recomendacoes: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Energia Alerta</Text>

      <View style={styles.buttonContainer}>
        <Button title="Registrar desastre" onPress={() => navigation.navigate('Localizacao')} color= '#778899'/>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Panorama Geral" onPress={() => navigation.navigate('Panorama')} color= '#778899'/>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Recomendações" onPress={() => navigation.navigate('Recomendacoes')} color= '#778899' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor:'#B0C4DE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#0d47a1',
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius:25,
  },
});
