import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useRef } from 'react'
import Header from './components/Header'
import appValue from './constvalue';
import LottieView from 'lottie-react-native';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const animations = {
  Friends: require("./animationJson/Friends.json"),
  Love: require("./animationJson/Love.json"),
  Affection: require("./animationJson/Affection.json"),
  Marriage: require("./animationJson/Marriage.json"),
  Enemy: require("./animationJson/Enemy.json"),
  Sibling: require("./animationJson/Sibling.json"),
};

const App = () => {
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const [firstName, setfirstName] = useState("");
  const [secName, setsecName] = useState("");
  const [result, setResult] = useState("");
  const flames = (name1, name2) => {
    let arr1 = name1.toLowerCase().replace(/\s+/g, "").split("");
    let arr2 = name2.toLowerCase().replace(/\s+/g, "").split("");

    for (let i = 0; i < arr1.length; i++) {
      const index = arr2.indexOf(arr1[i]);
      if (index !== -1) {
        arr1.splice(i, 1);
        arr2.splice(index, 1);
        i--;
      }
    }

    const count = arr1.length + arr2.length;
    const flamesList = ['F', 'L', 'A', 'M', 'E', 'S'];

    let index = 0;
    while (flamesList.length > 1) {
      index = (index + count - 1) % flamesList.length;
      flamesList.splice(index, 1);
    }

    const flamesMap = {
      F: "Friends",
      L: "Love",
      A: "Affection",
      M: "Marriage",
      E: "Enemy",
      S: "Sibling"
    };

    return flamesMap[flamesList[0]];
  };

  const clickaction = () => {
    if (firstName && secName) {
      const matchResult = flames(firstName, secName);
      setResult(matchResult);
    } else {
      setResult("Please enter both names 🙄");
    }
    inputRef.current?.blur();
    inputRef1.current?.blur();

  }
  const clickaction1 = () => {
    setResult('')
    setfirstName("");
    setsecName("");
  }

  return (
    <View style={style.maincontainer}>
      <StatusBar hidden={true} />
      <Header />

      <View style={style.textBox}>
        <TextInput style={style.textboxstyle}
          ref={inputRef}
          placeholderTextColor={"black"} placeholder={appValue.textbox1}
          value={firstName}
          onChangeText={text =>
            setfirstName(text)
          } />
        <TextInput style={style.textboxstyle}
          ref={inputRef1}
          placeholderTextColor={"black"} placeholder={appValue.textbox2}
          value={secName}
          onChangeText={text =>
            setsecName(text)
          } />
        <View style={style.buttoncontainer}>
          <TouchableOpacity style={style.buttonstyle} onPress={
            clickaction
          }>
            <Text style={style.buttonText}>Match 😍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonstyle} onPress={
            clickaction1
          }>
            <Text style={style.buttonText}>Reset 👻</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.resultconatainter}>
        {result && (<Text style={result === "Please enter both names 🙄" ? style.errormessage : style.showresult}>
          {result ? `${result}` : ""}
        </Text>)}
        <View style={style.imagecontainter}>
          {(result && animations[result]) && (<LottieView source={animations[result]} autoPlay loop style={{ width: 300, height: 300 }} />)}
        </View>

      </View>

    </View>
  )
}
const style = StyleSheet.create({
  maincontainer: {
    flex: 1
  },
  textBox: {
    width: width,
    height: 400,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"

  },
  textboxstyle: {
    width: "100%",
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 10,
    fontSize: 15,
    marginBottom: 20
  },
  buttonstyle: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginLeft: 10,
    backgroundColor: "#7C64E8",
    borderRadius: 50
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    elevation: 30,

  },
  imagecontainter: {
    flex: 1,

  },
  resultconatainter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  buttoncontainer: {
    flexDirection: "row"
  },
  showresult: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: "bold"
  },
  errormessage: {
    color: "red",
    fontSize: 15,
    fontFamily: "Pacifico-Regular"
  }

})
export default App