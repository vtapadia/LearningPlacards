import * as React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { FlatList, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { data, addOrUpdateAsync } from '../assets/data/Dictionary';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import {DictionaryItem} from '../types';

export default function TabTwoScreen() {
  // const [items, setItems] = React.useState<Array<DictionaryItem>>([
  //   {known:'the', unknown:'het'},
  //   {known:'the', unknown:'de'}
  // ]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [item, setItem] = React.useState<DictionaryItem>();
  const [addMode, setAddMode] = React.useState(false);

  const toggleModalVisibility = () => { 
    setModalVisible(!modalVisible); 
  };

  // addAsync({known: 'the', unknown: 'het'});
  // addAsync({known: 'the', unknown: 'de'});
  // addAsync({known: 'are', unknown: 'zijn'});

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true} onDismiss={toggleModalVisibility}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{padding: 5}}>Add a new Item to the list</Text>
              <TextInput 
                onChangeText={value => {
                  if (item) 
                    item.unknown = value
                  }} 
                placeholder="The new word"></TextInput>
              <TextInput 
                onChangeText={value => {
                  if (item) 
                    item.known = value
                  }} 
                placeholder="English translation"></TextInput>
              <TouchableHighlight
                  onPress={() => {
                    if (item) {
                      addOrUpdateAsync(item)
                    }
                    setModalVisible(!modalVisible);
                  }}>
                  <Text>Save Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
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
        <TouchableHighlight style={styles.buttonAdd} onPress={() => {
          setItem({known: '', unknown: ''})
          setAddMode(true)
          setModalVisible(true)
        }}>
          <Text>Add More</Text>
        </TouchableHighlight>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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

  },
  buttonAdd: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingBottom: 10,
    paddingTop: 10
  }

});
