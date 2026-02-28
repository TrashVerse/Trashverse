import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
  


export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);


  return (

    <View style={styles.container}>
      <Image source={require("@/assets/images/newLogo.png")}
      style={styles.logoImage}
      />
      <Text style={styles.logo}>TrashVerse</Text>  
      <Image source={require("@/assets/images/Group 1.png")}/>
      <Text style={styles.tagline}>Transforming Waste into Wealth & Financial {"\n"}
        Inclusion for Nigeria
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C7F36B",
    paddingHorizontal: 24,
  },
  logoImage: {
    width: 350,
    height: 350,
  },
  logo: {
    fontFamily:"poppins-bold",
    color: "#1E7F4F",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 14,
  },
  tagline: {
    textAlign: "center",
    fontFamily: "poppins-regular",
    fontSize: 14,
    marginTop: 10,
    color: "black",
  },
});
