import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { 
  Container, 
  Content, 
  List, 
  ListItem, 
  Text, 
  Button,
  Form,
  Item,
  Label,
  Input,
  Body
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';



export default class Order extends React.Component {
  static navigationOptions = {
    headerTitle: 'Sipariş Oluştur',
    title: 'Menü',
    headerStyle: {
      backgroundColor: 'tomato'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    }
  }
  state = {isEmpty: true, basket: {}, total: 0, phone: "", name: "", address: "", customer_id: ""}

  componentDidMount(){
    this.loadBasket();
    this.loadInfo();
  }

  loadBasket(){
    storage.load({ key: 'basket' }).then(ret => {
      this.setState({ isEmpty: false, basket: ret});
      let tot = 0;
      Object.keys(ret).forEach(item => { 
        tot += ret[item].price;
      });
      this.setState({ total: tot });
    }).catch(err => {
      console.log('Sepet yüklenemedi');
    });
  }

  loadInfo(){
    storage.load({ key: 'info' }).then(ret => {
      this.setState({ phone: ret.phone, name: ret.name, address: ret.address });
    }).catch(err => {
      console.log('Kullanıcı bilgileri bulunamadı.');
    });
  }

  makeOrder(){
    axios({
        method: 'post',
        url: 'http://10.0.2.2:3000/orders',
        data: {
          phone: this.state.phone,
          name: this.state.name,
          address: this.state.address,
          basket: this.state.basket,
          total : this.state.total
        }
      }).then(function (response) {
        Alert.alert(
            'Siparişiniz başarılı'
        )
        console.log('response', response);
      }).catch(function (error) {
        console.log("error", error);
      }); 
  }

  
  
  clearBasket(){
    storage.remove({
      key: 'basket'
    });
  }
  mixedFunc(){
      this.clearBasket();
      this.makeOrder();
  }

  renderUserForm(){
    if(this.state.customer_id){
        return(
        <Text>
          Sayın {this.state.name}, siparişiniz kayıtlı olan {this.state.address} adresinize gönderilecektir. 
          Düzenlemek için lütfen ana sayfadaki bilgilerim bölümünü kullanın.
        </Text>);
      }else{
      return(
        <View>
          <Item>
            <Label>İsim Soyisim</Label>
            <Input 
              onChangeText={(text) => this.setState({ name: text })} 
              value={this.state.name}
            />
          </Item>
          
          <Item>
            <Label>Telefon</Label>
            <Input
              placeholder="544xxxxxxx"
              onChangeText={(text) => this.setState({ phone: text })} 
              keyboardType='phone-pad'
              maxLength={10}
              value={this.state.phone}
            />
          </Item>

          <Item>
            <Icon active name='ios-home' />
            <Input
              onChangeText={(text) => this.setState({ address: text })} 
              placeholder='Adres'
              value={this.state.address}
            />
          </Item>
        </View>
      );
    }
  }

  render() {
    if(this.state.isEmpty){
      return (
        <View style={styles.container}>
          <Text>Sepetinizde Ürün Yok</Text>
        </View>
      );
    }
    return(
      <Container>        
        <Content>
          <List style={{ backgroundColor: '#ffffff' }}>
            <ListItem>
              <Body>
                <Grid>
                  <Col>
                    <Text>Sipariş Tutarı:</Text>
                  </Col>
                  <Col>
                    <Text>{this.state.total} TL</Text>
                  </Col>
                </Grid>
              </Body>
            </ListItem>
          </List>
            <Form>               
              {this.renderUserForm()}
              <Button success style={{ margin: 5 }} onPress={() => { this.mixedFunc() }} block>
                <Text>SİPARİŞİ GÖNDER</Text>
              </Button>
            </Form>

        </Content>
      </Container>
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
});