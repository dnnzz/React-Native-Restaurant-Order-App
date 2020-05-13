import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  List,
  Container, 
  Content, 
  ListItem, 
  Thumbnail, 
  Text, 
  Body, 
  Card, 
  CardItem, 
  Left, 
  Right, 
  Icon,
  Spinner,
  Button as Btn
} from 'native-base';
import axios from 'axios';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Menu extends Component {
  state = { data: [], basketModal: false, tempItem: {name: '', price: 0.0}, emptyItem: {price: '',name: 0.0} };
  
  getItems() {
    const url = `http://10.0.2.2:3000/items`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ data: data })
     });
  }
  componentDidMount(){
    this.getItems();
  }
  render() {
    return (
        <List
            style={styles.list}
            dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
                <Body>
                  <Grid>
                    <Col>
                      <Text>{item.name}</Text>
                      <Text note>{item.price} TL</Text>
                    </Col>
                   <Col style={{ width: 50 }}>
                      <Btn style={{ backgroundColor: 'tomato' }} onPress={() => {
                          this.showAddBasket(true, item);
                        }}>
                        <Icon name='add' /> 
                      </Btn>
                    </Col>
                  </Grid>
                </Body>
              </ListItem>
            }>
          </List>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: '#fff'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }
});
