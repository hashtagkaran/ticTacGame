import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Container,
  Content,
  Header,
  Body,
  Card,
  H1,
  H3,
  Button,
  Title,
} from 'native-base';
import Icons from './component/Icons';
import Snackbar from 'react-native-snackbar';

const itemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMsg, setWinMsg] = useState('');

  const changeItem = (itemNumber) => {
    if (winMsg) {
      return Snackbar.show({
        text: winMsg,
        backgroundColor: '#000',
        textColor: '#fff',
      });
    }

    if (itemNumber[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#fff',
      });
    }
    checkIsWinner();
  };

  const reloadGame = () => {
    setIsCross(false);
    setWinMsg('');
    itemArray.fill('empty', 0, 9);
  };

  const checkIsWinner = () => {
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMsg(`${itemArray[0]} Won`);
    }
  };

  return (
    <Container style={{backgroundColor: '333945', padding: 5}}>
      <Header>
        <Body>
          <Title>Hashtagkaran TicTacToe</Title>
        </Body>
      </Header>
      <Content>
        <View style={styles.grid}>
          {itemArray.map((item, index) => (
            <TouchableOpacity
              style={styles.box}
              key={index}
              onPress={() => changeItem(index)}>
              <Card style={styles.card}>
                <Icons name={item} />
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {winMsg ? (
          <View>
            <H1 style={styles.message}>{winMsg}</H1>
            <Button onPress={reloadGame} primary block rounded>
              <Text>Relaod Game</Text>
            </Button>
          </View>
        ) : (
          <H3 style={styles.message}>{isCross ? 'Cross' : 'Circle'} Turns</H3>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },

  box: {
    width: '33%',
    marginBottom: 6,
  },
  card: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    marginTop: 20,
    backgroundColor: '#4652b3',
    paddingVertical: 10,
    marginVertical: 10,
  },
});
export default App;
