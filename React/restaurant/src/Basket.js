import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { 
  Container, 
  Content, 
  Thumbnail,
  List,
  ListItem, 
  Text, 
  Body, 
  Button,
  Spinner
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';


export default class Basket extends Component {
  
  state = {isEmpty: false, loading: true, basket: {}, total: 0}

  componentDidMount(){
    storage.load({ key: 'basket' }).then(ret => {
      this.setState({ isEmpty: false, basket: ret });
      let tot = 0;
      Object.keys(ret).forEach(item => { 
        tot += ret[item].price;
      });
      this.setState({ total: tot, loading: false });
    }).catch(err => {
      this.setState({ isEmpty: true });
    });
  }

  clearBasket(){
    storage.remove({
      key: 'basket'
    });
    this.setState({ basket: {}, isEmpty: true, total: 0 });
  }

  render() {
    if(this.state.isEmpty){
      return (
        <View style={styles.container}>
          <Text>SEPET BOŞ!</Text>
        </View>
      );
    }else{
      if(this.state.loading){
        return(
          <View style={styles.container}>
            <Spinner color='red' />
          </View>
        );
      }
      console.log(this.state);
      return(
        <Container>        
          <Content>       
            <List style={{ backgroundColor: '#fff' }} dataArray={Object.keys(this.state.basket)}
              renderRow={(key) =>
                <ListItem>
                  <Body style={{ height: 80, padding: 10 }}>
                    <Grid>
                      <Col style={{ width: 80 }}>
                        <Thumbnail size={80} source={{ uri: 'https://via.placeholder.com/30' }} />
                      </Col>
                      <Col>
                        <Text>{this.state.basket[key].item.name}</Text>
                        <Text note>{this.state.basket[key].item.price} TL</Text>
                      </Col>
                      <Col>
                        <Text>{this.state.basket[key].size} Adet</Text>
                        <Text>{this.state.basket[key].price} TL</Text>
                      </Col>
                    </Grid>
                  </Body>
                </ListItem>              
              }>
            </List>
            <List style={{ backgroundColor: '#ffffff' }}>
              <ListItem>
                <Body>
                  <Grid>
                    <Col>
                      <Text>Toplam:</Text>
                    </Col>
                    <Col>
                      <Text>{this.state.total} TL</Text>
                    </Col>
                  </Grid>
                </Body>
              </ListItem>
            </List>

            <Grid>
                <Col>
                  <Button success style={{ margin: 5 }} onPress={() => { this.props.navigation.navigate('Sipariş') }} block>
                    <Text>SİPARİŞ VER</Text>
                  </Button>
                </Col>
                <Col>
                  <Button danger style={{ margin: 5 }} onPress={() => { this.clearBasket() }} block>
                    <Text>SEPETİ TEMİZLE</Text>
                  </Button>
                </Col>
              </Grid>
          </Content>
        </Container>
      );
    }
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