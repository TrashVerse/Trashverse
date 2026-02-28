import { Image, StyleSheet, Text, View } from "react-native";

export default function SlideOne() {
  return (
    <View style={styles.slide}>
      <Image
        style={styles.image}
        source={require("@/assets/onboarding/illustation.png")}
      />
      <Text style={styles.title}>Join the Green Movement in Abia State</Text>
      <Text style={styles.desc}>
        Contribute to sustainability with easy, effective recycling.
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
    // resizeMode: "contain",
    width: "100%",
    height: 400,
    marginTop: "20%",
    marginBottom: "10%",
    marginLeft: "5%",
  },
  title: {
    fontFamily: "out-fit-semi-bold",
    fontSize: 25,
    fontWeight: "600",
  },
  desc: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "400",
    color: "gray",
  },
});
