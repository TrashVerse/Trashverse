import { Ionicons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Guide = {
  id: string;
  name: string;
  icon: IconName;
  route: Href;
};

type Props = {
  guide: Guide;
  active: boolean;
  onPress: () => void;
  onActivate: () => void;
};

export default function GuideItem({
  guide,
  active,
  onPress,
  onActivate,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const width = useSharedValue(52);

  useEffect(() => {
    width.value = withTiming(hovered ? 120 : 52, { duration: 250 });
  }, [hovered, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onActivate}
    >
      <Animated.View style={[styles.item, animatedStyle]}>
        <Ionicons name={guide.icon} size={22} color="#4BAE4F" />
        {hovered && <Text style={styles.text}>{guide.name}</Text>}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 52,
    backgroundColor: "#B6E388",
    borderRadius: 26,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "500",
    color: "#365314",
  },
});
