import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";


export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: ``
    };
  }

  componentDidMount() {
      // Llama a la función getDetails aquí para que los datos sean recuperados tan pronto como se despliegue la pantalla
      this.getDetails()
  }
  getDetails = () => {
      // Escribe el código para recuperar los datos de planetas específicos desde la API
    const {url}=this.state
    axios
    .get(url)
    .then((response)=>{
      this.setDetails(response.data.data)
    })
    .catch((error)=>{
      Alert.alert(error.message)
    })
  };
  /* Esta función determinará el estado de imagePath dependiendo de planetType*/
  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/Gas_Giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/Terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/Super_Earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/Neptune-like.png");
        break;
      default:
        imagePath = require("../assets/Gas_Giant.png");
    }

  this.setState({
    details: planetDetails,
    imagePath: imagePath,
  });
};
  render() {
    const {details,imagePath}=this.state
    if (details.specifications){
      return <View style={styles.container}>
        <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1, paddingTop: 20 }}
          >
          <Image source={imagePath} style={{height:250, width:250, marginTop:20, alignSelf:"center"}} />
          <View style={{marginTop:50}}>
            <Text>{details.planetName}</Text>
            <View style={{alignSelf:"center"}}>
              <Text style={styles.planetData}>{details.distance_from_earth}</Text>
              <Text style={styles.planetData}>{details.distance_from_their_sun}</Text>
              <Text style={styles.planetData}>{details.gravity}</Text>
              <Text style={styles.planetData}>{details.orbital_periot}</Text>
              <Text style={styles.planetData}>{details.orbital_speed}</Text>
              <Text style={styles.planetData}>{details.planet_mass}</Text>
              <Text style={styles.planetData}>{details.planet_radius}</Text>
              <Text style={styles.planetData}>{details.planet_type}</Text>
              <View style={{flexDirection:"row", alignSelf:"center"}}>
                 <Text style={styles.planetData}>{details.specifications?`specificaciones:`:" "}</Text>
                 {details.specifications.map((item,index)=>(
                  <Text key={index.toString()} style={styles.planetData}>{item}</Text>
                 ))}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    }  
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, }, 
  planetName: { 
    fontSize: 45, 
    color: "white", 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 40, 
    width: "80%", 
    alignSelf: "center", 
    fontFamily:"monospace" }, 
  planetData: { 
    fontSize: 15, 
    color: "white", 
    textAlign:"center", 
    fontFamily:"monospace" },

});
