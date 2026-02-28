import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? "#FFFFFF" : "#D9F99D"}
            />
          ),
        }}
      />

      {/* History */}
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="history"
              size={24}
              color={focused ? "#FFFFFF" : "#D9F99D"}
            />
          ),
        }}
      />

      {/* Sell (CENTER BUTTON) */}
      <Tabs.Screen
        name="sell"
        options={{
          tabBarIcon: () => (
            <View style={styles.scanButton}>
              <Ionicons name="scan" size={26} color="#65A30D" />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#84CC16",
    height: 70,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "absolute",
  },

  scanButton: {
    width: 56,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
  },
});
