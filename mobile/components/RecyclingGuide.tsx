import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import GuideItem from "./GuideItem";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Guide = {
  id: string;
  name: string;
  icon: IconName;
  route: Href;
};

const guides: Guide[] = [
  { id: "1", name: "Plastic", icon: "water-outline", route: "/history" as Href }, // bottle
  { id: "2", name: "Paper", icon: "document-outline", route: "/history" as Href }, // sheet
  { id: "3", name: "Metal", icon: "cube-outline", route: "/history" as Href }, // can/tin
  { id: "4", name: "Electronics", icon: "hardware-chip-outline", route: "/history" as Href },
  { id: "5", name: "Glass", icon: "wine-outline", route: "/history" as Href },
  { id: "6", name: "Organic", icon: "leaf-outline", route: "/history" as Href },
  { id: "7", name: "Textile", icon: "shirt-outline", route: "/history" as Href },
];

export default function RecyclingGuide() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Recycling Guide</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.row}
      >
        {guides.map((guide) => (
          <View key={guide.id} style={styles.itemWrapper}>
            <GuideItem
              guide={guide}
              active={activeId === guide.id}
              onActivate={() => setActiveId(guide.id)}
              onPress={() => router.push(guide.route)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemWrapper: {
    marginRight: 10,
    marginBottom: 10,
  },
});
