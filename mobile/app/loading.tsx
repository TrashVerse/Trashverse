import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function LoadingScreen() {
  const router = useRouter();

  const dots = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

useEffect(() => {
  // animation
  const animate = dots.map((dot, index) =>
    Animated.sequence([
      Animated.delay(index * 150),
      Animated.timing(dot, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dot, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }),
    ])
  );

  Animated.loop(Animated.stagger(200, animate)).start();

  // navigation after 3 seconds
  const timer = setTimeout(() => {
    router.replace("/login"); 
  }, 3000);

  return () => clearTimeout(timer);
}, );


  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <Animated.View style={[styles.dot, styles.top, { opacity: dots[0] }]} />
        <Animated.View style={[styles.dot, styles.right, { opacity: dots[1] }]} />
        <Animated.View style={[styles.dot, styles.bottom, { opacity: dots[2] }]} />
        <Animated.View style={[styles.dot, styles.left, { opacity: dots[3] }]} />
      </View>

      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const DOT = 25;
const SIZE = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FFED",
    justifyContent: "center",
    alignItems: "center",
  },

  loader: {
    width: SIZE,
    height: SIZE,
    position: "relative",
    marginBottom: 20,
  },

  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: "green",
    position: "absolute",
  },

  top: {
    top: 0,
    left: "50%",
    transform: [{ translateX: -DOT / 2 }],
    backgroundColor: "#12251c",
  },

  right: {
    right: 0,
    top: "50%",
    transform: [{ translateY: -DOT / 2 }],
      backgroundColor: "#12251c",
  },

  bottom: {
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -DOT / 2 }],
  },

  left: {
    left: 0,
    top: "50%",
    transform: [{ translateY: -DOT / 2 }],
  },

  text: {
    fontSize: 24,
    color: "black",
    fontFamily: "outfit",
    fontWeight: "medium",
  },
});
