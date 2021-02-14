import * as React from 'react';
import { Alert, Animated, Modal, Pressable, StyleSheet, TextInputSubmitEditingEventData } from 'react-native';
import { FlatList, LongPressGestureHandler, TouchableHighlight } from 'react-native-gesture-handler';

import * as Layout from '../constants/Layout';
import { Text, View, SafeAreaView, TextInput } from '../components/Themed';
import { RootState } from '../store/reducers/CombinedReducer';
import {DictionaryItem} from '../types';
import {addItem, removeItem} from '../store/actions/DictionaryActions'
import { connect } from 'react-redux';
import { DataScreenProps } from '../navigation/BottomTabNavigator';
import { AntDesign } from '@expo/vector-icons'; 
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const mapState = (state: RootState) => (
  {
    data: state.dictionary.data.sort((a,b)=>{
      return a.unknown.localeCompare(b.unknown)
    }),
    count: state.dictionary.data.length
  }
)

const mapDispatch = {
  addItem, removeItem
}

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & DataScreenProps

const SPACING = 20;
const BIN_SIZE = 40;
const ITEM_SIZE = BIN_SIZE + SPACING*2 + SPACING/2

function TabTwoScreen(props: Props) {
  const inputSecound = React.createRef<typeof TextInput>(); //TODO Need to figure out how to pass the reference and use it.
  const [modalVisible, setModalVisible] = React.useState(false);
  const [item, setItem] = React.useState<DictionaryItem>();
  const [addMode, setAddMode] = React.useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const colorScheme = useColorScheme();
  
  const toggleModalVisibility = () => { 
    setModalVisible(!modalVisible); 
  };

  const longPressGestureHandler = (dItem:DictionaryItem) =>{
    Alert.alert('Confirmation', 'Do you want to delete ' + dItem.unknown + ' ?', [
      {text: 'Yes', style: 'default', onPress: ()=>props.removeItem(dItem)}, 
      {text: 'Cancel', style:'cancel'}])
  }

  const handleFirstTextComplete =()=>{
    // console.log(inputSecound.current)
  }

  const handleSaveItemEvent = () => {
    if (item && item.known && item.unknown) {
      props.addItem(item)
    }
    setModalVisible(!modalVisible);
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
              <TextInput style={styles.inputField} autoFocus={true}
                returnKeyType='next'
                onSubmitEditing={handleFirstTextComplete}
                onChangeText={value => {
                  if (item) 
                    item.unknown = value
                  }} autoCorrect={false}
                placeholder="The new word" autoCompleteType='off'></TextInput>
              <TextInput style={styles.inputField} 
                returnKeyType='done'
                onSubmitEditing={handleSaveItemEvent}
                onChangeText={value => {
                  if (item) 
                    item.known = value
                  }} 
                placeholder="In English"></TextInput>
              <TouchableHighlight style={{borderWidth:1, borderRadius:10, padding: 10, marginTop:7}}
                  onPress={handleSaveItemEvent}>
                  <Text>Save Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
      {/* <Text style={styles.title}>Data Overview</Text> */}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.dataView} >
        <Animated.FlatList 
          data={props.data} 
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true})}
          contentContainerStyle={{
            padding: SPACING
          }}
          keyExtractor={(item) => item.unknown}
          renderItem={({item, index, separators}) => {
            const inputRange = [
              -1, 
              0, 
              ITEM_SIZE * (index),
              ITEM_SIZE * (index+2)
            ]
            const opacityInputRange = [
              -1, 
              0, 
              ITEM_SIZE * (index),
              ITEM_SIZE * (index+1)
            ]
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1,1,1,0]
            })
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1,1,1,0]
            })

            return <Animated.View style={{flexDirection: 'row', 
            padding: SPACING/2, 
            justifyContent: 'space-between',
            marginBottom: SPACING, borderRadius: 12,
            borderWidth: 1,
            shadowColor: '#000', 
            shadowOffset: {width: 0, height: 10}, shadowRadius: 20, shadowOpacity: .4,
            opacity,
            transform: [{scale}]
            }}>
              <View style={{flexDirection: 'column', backgroundColor: 'transparent'}}>
                <Text style={{fontWeight: '700', fontSize: 22}}>{item.unknown}</Text>
                <Text style={{fontSize: 18, opacity: .7}}>{item.known}</Text>
              </View>
              <Pressable onLongPress={()=>longPressGestureHandler(item)}>
                <AntDesign name="delete" size={BIN_SIZE} color={Colors[colorScheme].text} />
              </Pressable>
            </Animated.View>
        }} />
      </View>
      <View style={styles.buttonView} >
        <TouchableHighlight style={styles.buttonAdd} onPress={() => {
          setItem({known: '', unknown: ''})
          setAddMode(true)
          setModalVisible(true)
        }}>
          <Text style={{fontSize: 28, fontWeight: '500'}}>Add More</Text>
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
    width: '100%',
    textAlign: 'center'
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
  buttonView:{
    padding: SPACING,
    width: '100%',
  },
  buttonAdd: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#eee',
  }

});
