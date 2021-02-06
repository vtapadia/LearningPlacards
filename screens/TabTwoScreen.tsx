import * as React from 'react';
import { Alert, Modal, Pressable, StyleSheet } from 'react-native';
import { FlatList, LongPressGestureHandler, TouchableHighlight } from 'react-native-gesture-handler';

import { Text, View, SafeAreaView, TextInput } from '../components/Themed';
import { RootState } from '../store/reducers/CombinedReducer';
import {DictionaryItem} from '../types';
import {addItem, removeItem} from '../store/actions/DictionaryActions'
import { connect } from 'react-redux';
import { DataScreenProps } from '../navigation/BottomTabNavigator';

const mapState = (state: RootState) => (
  {
    data: state.dictionary.data,
    count: state.dictionary.data.length
  }
)

const mapDispatch = {
  addItem, removeItem
}

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & DataScreenProps


function TabTwoScreen(props: Props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [item, setItem] = React.useState<DictionaryItem>();
  const [addMode, setAddMode] = React.useState(false);

  const toggleModalVisibility = () => { 
    setModalVisible(!modalVisible); 
  };

  const longPressGestureHandler = (dItem:DictionaryItem) =>{
    Alert.alert('Confirmation', 'Do you want to delete ' + dItem.unknown + ' ?', [
      {text: 'Yes', style: 'default', onPress: ()=>props.removeItem(dItem)}, 
      {text: 'Cancel', style:'cancel'}])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true} onDismiss={toggleModalVisibility}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{padding: 5, fontSize: 15}}>Add a NEW Placard</Text>
              <TextInput style={styles.inputField}
                onChangeText={value => {
                  if (item) 
                    item.unknown = value
                  }} autoCorrect={false}
                placeholder="The new word" autoCompleteType='off'></TextInput>
              <TextInput style={styles.inputField}
                onChangeText={value => {
                  if (item) 
                    item.known = value
                  }} 
                placeholder="English translation"></TextInput>
              <TouchableHighlight style={{borderWidth:1, borderRadius:10, padding: 10, marginTop:7}}
                  onPress={() => {
                    if (item && item.known && item.unknown) {
                      props.addItem(item)
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
          data={props.data} 
          keyExtractor={(item) => item.unknown}
          renderItem={({item, index, separators}) => (
          <Pressable 
            style={styles.itemRow} onLongPress={()=>longPressGestureHandler(item)}>
            <Text style={styles.itemText}>{item.unknown} ({item.known})</Text>
          </Pressable>
        )}>
        </FlatList>
      </View>
      <View style={styles.buttonView} >
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

export default connect(mapState, mapDispatch)(TabTwoScreen)


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '70%',
  },
  inputField: {
    padding: 7,
    margin: 7,
    fontSize: 15,
    borderWidth: 1,
    width: '100%'
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
  buttonView:{
    height: 80
  },
  buttonAdd: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingBottom: 10,
    paddingTop: 10
  }

});
