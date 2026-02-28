import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SlideOne from "../components/SlideOne";
import SlideThree from "../components/SlideThree";
import SlideTwo from "../components/SlideTwo";

const { width } = Dimensions.get("window");

const slides = [
  { id: "1", component: SlideOne },
  { id: "2", component: SlideTwo },
  { id: "3", component: SlideThree },
];

export default function OnboardingScreen() {
  const flatListRef = useRef<FlatList | null>(null);
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const goNext = () => {
    if (index < slides.length - 1 && flatListRef.current) {
      const newIndex = index + 1;
      flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
      setIndex(newIndex);
    }
  };

  const goToLoading = () => {
    router.replace("/loading");
  };

return (
  <View style={styles.container}>

    {/* Slides */}
    <View style={styles.slidesContainer}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndex(newIndex);
        }}
        renderItem={({ item }) => {
          const Slide = item.component;
          return (
            <View style={{ width }}>
              <Slide />
            </View>
          );
        }}
      />
    </View>

    {/* Footer */}
    <View style={styles.bottom}>
      <TouchableOpacity onPress={goToLoading}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>

      {index < slides.length - 1 ? (
        <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
          <AntDesign name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.getStarted} onPress={goToLoading}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>

  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FFED",
  },

  slidesContainer: {
    flex: 1,
  },

  bottom: {
    height: 90, // 👈 reserve space
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: "#F5FFED",
  },

  skip: {
    color: "#6FAF8E",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },

  nextBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
  },

  getStarted: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#2E7D32",
    borderRadius: 24,
  },

  getStartedText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
