import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Form,
  Item,
  Label,
  Input
} from 'native-base';
let storage = new Storage({
  size: 3000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 365,
  enableCache: true,
  sync: {

  }
});
import axios from 'axios';

global.storage = storage;

class Home extends Component {
  state = { isEmpty: true, basket: {}, total: 0, phone: "", name: "", address: "" }

  componentDidMount() {
    storage.load({ key: 'info' }).then(ret => {
      this.setState({ phone: ret.phone, name: ret.name, address: ret.address });
    })
  }

  clearData() {
    storage.remove({
      key: 'info'
    }).then(ret => {
      this.setState({ phone: "", name: "", address: "" });
      alert('Verileriniz Temizlendi');
    });
  }
  updateInformation() {
    storage.save({
      key: 'info',
      data: {
        phone: this.state.phone,
        name: this.state.name,
        address: this.state.address
      }

    }).then(ret => {
      alert('Adres kaydedildi.');
    }
    );
  }
  saveDatabase() {
    axios({
      method: 'post',
      url: 'http://10.0.2.2:3000/users',
      data: {
        phone: this.state.phone,
        name: this.state.name,
        address: this.state.address
      }
    }).then(function (response) {
      console.log('response', response);
    }).catch(function (error) {
      console.log("error", error);
    });
  }
  mixedFunction() {
    this.updateInformation();
    this.saveDatabase();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Form style={{ backgroundColor: 'white', padding: 10 }}>
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
            <Input
              onChangeText={(text) => this.setState({ address: text })}
              placeholder='Adres'
              value={this.state.address}
            />
          </Item>
          <Button color="chartreuse" style={{ margin: 5 }} onPress={() => { this.mixedFunction() }} title="Adresi Kaydet" block>
          </Button>
          <Button color="#8b0000" style={{ margin: 5 }} onPress={() => { this.clearData() }} title="Adresi sil" block>
          </Button>
        </Form>
      </View>
    );
  }
}
export default Home;