import { Image, StyleSheet, Text, View } from "react-native";

export default function SlideThree() {
  return (
    <View style={styles.slide}>
      <Image style={styles.image1} source={require("@/assets/onboarding/illustaion.png")} />
            <Image style={styles.image} source={require("@/assets/onboarding/illustation (2).png")} />
      <Text style={styles.title}>Smart Waste Identification:</Text>
      <Text style={styles.desc}>
        Instantly identify your waste and get proper disposal instructions with AI.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
    image: {
    resizeMode: "contain",
    width: "90%",
    height: 300,
    marginTop: "-95%",
  },
  image1: {
    resizeMode: "contain",
    width: "150%",
    height: 200,
    marginTop: 200,
  },
  title: { 
    fontSize: 18, 
    fontWeight: "600",
    marginTop: "20%",
 },
  desc: { 
    fontSize: 17, 
    textAlign: "center",
    fontWeight: "400",
},
});
