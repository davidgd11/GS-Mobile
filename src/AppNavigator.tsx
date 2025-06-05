import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './telas/Menu';
import Panorama from './telas/Panorama'
import Localizacao from './telas/Localizacao';
import Tempo from './telas/Tempo';
import Prejuizos from './telas/Prejuizos';
import Recomendacoes from './telas/Recomendacoes';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu Inicial' }} />
      <Stack.Screen name="Panorama" component={Panorama} />
      <Stack.Screen name="Localizacao" component={Localizacao} />
      <Stack.Screen name="Tempo" component={Tempo} />
      <Stack.Screen name="Prejuizos" component={Prejuizos} />
      <Stack.Screen name="Recomendacoes" component={Recomendacoes} />
    </Stack.Navigator>
  );
}
