import { Image, StyleSheet, Text, View } from "react-native";

export default function SlideTwo() {
  return (
    <View style={styles.slide}>
      <Image style={styles.image} source={require("@/assets/onboarding/illustation (1).png")} />
      <Text style={styles.title}>Nearby Recycling Stations </Text>
      <Text style={styles.desc}>
        Find the nearest recycling drop-off points with real-time updates.  
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
    marginTop: "30%",
  },
  title: { 
    fontSize: 18, 
    fontWeight: "600"
 },
  desc: { 
    fontSize: 16, 
    textAlign: "center" 
},
});