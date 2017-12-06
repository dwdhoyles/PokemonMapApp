import React from 'react';
import { Text, View, Image } from 'react-native';
import { Header, Left, Button, Icon, Body, Title, Right, Fab } from 'native-base';
import { MapView } from 'expo';
import Meteor, {createContainer} from 'react-native-meteor';

var mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#b3ff00"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

class PokeMap extends React.Component{
  state = {
    location: {
      latitude:49.1529,
      longitude:-55.3420,
      latitudeDelta: 0.122,
      longitudeDelta: 0.0421,
    }
  }
  recordEvent = (x) =>{
    console.log(x);
    this.setState({location: x});
  }
  addPokemon = ()=>{
		Meteor.call('pokemon.add',this.state.location, (err,res)=>{
			console.log('add function', err,res);
		})
	}
  deletePokemon = () => {
    if(this.props.pokemon.length === 0){
      return;
    }
    var remove = this.props.pokemon[0]._id;
    Meteor.call("pokemon.subtract", remove, (err,res)=>{
      console.log('delete function', err,res);
    })
  }
  renderPokemon = () => {
    return this.props.pokemon.map(p => {
      return(
        <MapView.Marker
          coordinate={{latitude: p.latitude, longitude: p.longitude}}
          key={p._id}
        >
          <Image
            source={{uri: "http://192.168.2.18:3000/"+p.image}}
            style={{height:50, width: 50}}
          />
        </MapView.Marker>
      )
    })
  }
  logout = () => {
    Meteor.logout();
    this.props.flipLogin(false);
  }
  render() {
    console.log(this.props.pokemon);
    return(
        <View style={{flex:1}}>
          <Header>
            <Left></Left>
            <Body>
              <Title>PokeMap</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.logout}>
                <Icon name="power"/>
              </Button>
            </Right>
          </Header>
          <MapView
            style={{flex: 1}}
            initialRegion={this.state.location}
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            onRegionChangeComplete={(x) => this.recordEvent(x)}
          >
          {this.renderPokemon()}
          </MapView>
          <Fab
            direction="left"
            position="bottomRight"
            style={{backgroundColor: 'green'}}
            onPress={this.addPokemon}
          >
              <Icon name="add"/>
            </Fab>
            <Fab
              direction="right"
              position="bottomLeft"
              style={{backgroundColor: 'red'}}
              onPress={this.deletePokemon}
            >
                <Icon name="remove"/>
              </Fab>
        </View>
    )
  }
}



export default createContainer(params=>{
  Meteor.subscribe('pokemon');
      return{
        pokemon: Meteor.collection('pokemon').find({})
      };
}, PokeMap);
