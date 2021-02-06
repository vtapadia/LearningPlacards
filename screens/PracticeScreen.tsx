import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, SafeAreaView } from '../components/Themed';
import { PracticeScreenProps } from '../navigation/BottomTabNavigator';
import { RootState } from '../store/reducers/CombinedReducer';
import { DictionaryItem } from '../types';

const mapState = (state: RootState) => (
  {
    data: state.dictionary.data,
    count: state.dictionary.data.length
  }
)

const mapDispatch = {}

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & PracticeScreenProps

function PracticeScreen(props:Props) {

  const [result,setResult] = React.useState(false);
  const [item, setItem] = React.useState<DictionaryItem>();

  const random = () => {
    if (props.count == 0) {
      return;
    }
    const ran = Math.floor(Math.random()*props.count)
    return props.data[ran];
  }

  React.useEffect(()=> {
    setItem(random())
  }, [props.count]);

  const clicked = () => {
    setResult(!result);
    if (result) {
      setItem(random());
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Practice</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.practiceView}>
        { item ? 
        <TouchableHighlight style={styles.practiceTouch} onPress={clicked}>
          <View style={styles.qaView}>
            <Text style={styles.question}>{item?.unknown}</Text>
            { result ? 
            <Text style={styles.answer}>{item?.known}</Text> : <Text style={styles.answer}></Text>
            }
          </View>
        </TouchableHighlight>
        : 
        <View style={{...styles.practiceView, alignItems: 'center'}}>
          <Text style={styles.title}>No Placards Found</Text>
          <Text>Please add a few from the data tab</Text>
        </View>
        }
      </View>
    </SafeAreaView>
  );
}

const PracticeScreenComp = connect(mapState, mapDispatch)(PracticeScreen)
export default PracticeScreenComp

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
  practiceView: {
    flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  practiceTouch: {
    height: '100%',
    alignSelf: 'stretch',
    // backgroundColor: 'green',
    justifyContent: 'center',
    padding: 10,
  },
  qaView:{
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  question: {
    height: '40%',
    padding: 10,
    fontSize: 24
  },
  answer: {
    height: '40%',
    fontSize: 24,
  }
});
