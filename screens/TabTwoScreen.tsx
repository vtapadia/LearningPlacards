import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { data, addAsync } from '../assets/data/Dictionary';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import {DictionaryItem} from '../types';

export default function TabTwoScreen() {
  // const [items, setItems] = React.useState<Array<DictionaryItem>>([
  //   {known:'the', unknown:'het'},
  //   {known:'the', unknown:'de'}
  // ]);

  addAsync({known: 'the', unknown: 'het'});
  addAsync({known: 'the', unknown: 'de'});
  addAsync({known: 'are', unknown: 'zijn'});

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Data Overview</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.dataView} >
        <FlatList style={styles.flatList}
          data={data} 
          keyExtractor={(item) => item.unknown}
          renderItem={({item, index, separators}) => (
          <TouchableHighlight 
            style={styles.itemRow}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <Text style={styles.itemText}>{item.unknown} ({item.known})</Text>
          </TouchableHighlight>
        )}>

        </FlatList>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  dataView: {
    flex: 1,
    alignItems: 'stretch',
    marginHorizontal: 10,
    alignSelf: 'stretch',
  },
  flatList: {
  },
  itemRow: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'stretch',
    alignItems: 'stretch',
    paddingVertical: 7
    // backgroundColor: 'lightgrey'
    
  },
  itemText: {
    fontSize: 16,

  }

});
