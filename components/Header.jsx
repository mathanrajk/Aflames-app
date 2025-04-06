import { View, Text,StyleSheet,Dimensions,StatusBar} from 'react-native'
import React from 'react'
import appValue from '../constvalue';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Header = () => {
  return (
    <View style={style.main}>
        <StatusBar hidden={true}/>
      <Text style={style.title} >{appValue.appName}</Text>
    </View>
  )
}

export default Header

const style = StyleSheet.create({
    main:{
        width:width,
        height:50,
        backgroundColor:"#A764E8",
        justifyContent:"center",
        padding:5,
        elevation:10,
    },
    title:{
        fontSize:20,
        color:"white",
        fontFamily:"Pacifico-Regular"
    }
})