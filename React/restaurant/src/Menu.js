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
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  List,
  Content, 
  ListItem,  
  Text, 
  Body, 
  Icon,
  Button as Btn
} from 'native-base';
import axios from 'axios';
import { Col, Grid } from 'react-native-easy-grid';
import Basket from './Basket';

export default class Menu extends Component {
 
  state = { data: [], loading: true, basketModal: false, tempItem: {name: '', price: 0.0,quantity:0}, emptyItem: {price: '',name: 0.0,quantity : 0} };
  
  getItems() {
    const url = `http://10.0.2.2:3000/items`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ data: data })
     });
  }
  showAddBasket(visible, item){
    this.setState({ text: 0, basketModal: visible, tempItem: item });
  }


  addToBasket(){
    if( this.state.text > 0){
      let item = this.state.tempItem;
      if(this.state.text <= this.state.tempItem.quantity){
      let basket = {};
      storage.load({ key: 'basket' }).then(ret => {
        basket = ret;
        this.saveBasket(basket, item);
      }).catch(err => {
        this.saveBasket(basket, item);
      });
      }else{
        Alert.alert(
          'Stokta istediğiniz miktarda ürün mevcut değil.'
        )
      }
    }else{
      Alert.alert(
        'Hata',
        'En az bir ürün eklemelisiniz!'
      );
    }
  }

  saveBasket(basket, item){
    basket[item._id] = {item: item, size: this.state.text, price: item.price * this.state.text}
    storage.save({
      key: 'basket',
      data: basket
    });
    this.setState({ basketModal: false });
    Alert.alert(
      'İşlem Tamam',
      'Ürün sepete eklendi.',
      [
        {text: 'Sepete Git', onPress: () => this.props.navigation.navigate('Sepet')},
        {text: 'Tamam'},
      ],
      { cancelable: false }
    )    
  }
  componentDidMount(){
    this.getItems();
  }
  render() {
    return (
      <Content>
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.basketModal}
      onRequestClose={() => {
        this.showAddBasket(false, this.state.emptyItem);
      }}>
        <View style={{ backgroundColor: 'white', marginLeft: 15, marginRight: 15, marginTop: 32, padding: 20 }}>
          <View style={{flexDirection: "row", flex: 1}}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/150' }} 
              style={{flex: 1, width: null, height: 200}}
            />
          </View>
          <View style={{ marginTop: 230 }}>
            <Text>{this.state.tempItem.name} - {this.state.tempItem.price} TL</Text>
            <TextInput
              style={{height: 40}}
              keyboardType='phone-pad'
              placeholder="Miktar Belirtin!"
              onChangeText={(text) => this.setState({text})}
            />
            <Button
              style={{ backgroundColor: 'tomato' }}
              title="Sepete Ekle"
              onPress={() => {
                this.addToBasket();
              }}>
            </Button>
          </View>
        </View>
    </Modal>
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
          </Content>
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
