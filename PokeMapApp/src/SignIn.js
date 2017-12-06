import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';


class SignIn extends React.Component{
  state = {
    email: "",
    password: ""
  }
  logIn = () => {
    var email = this.state.email;
    var password = this.state.password;

    this.props.signIn(email,password);
  }
  render(){
    return(
      <View style={{flex: 1}}>
        <View style={styles.inputStyle}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                onChangeText={(email)=>this.setState({email})}
              />
            </Item>
            <Item floatingLabel
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={(email)=>this.setState({password})}
            >
              <Label>Password</Label>
            </Item>
          </Form>
          <View style={{marginTop: 10}}>
            <Button
              primary
              block
              onPress={this.logIn}
            >
              <Text style={{color: 'white'}}>Sign In/Sign Up</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  inputStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
  },
  viewStyle: {

  }
}

export default SignIn;
