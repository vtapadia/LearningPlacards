import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {DictionaryItem} from '../types';

export default function TabTwoScreen() {
  const [items, setItems] = React.useState<Array<DictionaryItem>>([
    {known:'the', unknown:'het'},
    {known:'the', unknown:'de'}
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Overview</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList 
        data={items} 
        keyExtractor={(item) => item.unknown}
        renderItem={({item}) => (
        <TouchableHighlight>
          <Text>{item.unknown}</Text>
        </TouchableHighlight>
      )}>

      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
