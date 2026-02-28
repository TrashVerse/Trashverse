// import { View, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { usePathname, useRouter } from "expo-router";

// const COLORS = {
//   primary: "#1B5E20",      // dark green (active)
//   inactive: "#9E9E9E",     // gray
//   background: "#FFFFFF",  // pill background
//   scan: "#2E7D32",        // center button green
// };


// export default function FloatingTabBar() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const isActive = (route: string) => pathname === route;

//   return (
//     <View style={styles.container}>
//       {/* Home */}
//       <TabButton
//         icon="home-outline"
//         activeIcon="home"
//         active={isActive("/(tabs)/home")}
//         onPress={() => router.replace("/(tabs)/home")}
//       />

//       {/* Location */}
//       <TabButton
//         icon="location-outline"
//         activeIcon="location"
//         active={isActive("/(tabs)/location")}
//         onPress={() => router.replace("/(tabs)/location")}
//       />

//       {/* Scanner (CENTER) */}
//       <TouchableOpacity
//         style={styles.scanButton}
//         onPress={() => router.replace("/(tabs)/scan")}
//       >
//         <Ionicons name="scan" size={30} color="#fff" />
//       </TouchableOpacity>

//       {/* Sell */}
//       <TabButton
//         icon="pricetag-outline"
//         activeIcon="pricetag"
//         active={isActive("/(tabs)/sell")}
//         onPress={() => router.replace("/(tabs)/analytics")}
//       />

//       {/* Wallet */}
//       <TabButton
//         icon="wallet-outline"
//         activeIcon="wallet"
//         active={isActive("/(tabs)/wallet")}
//         onPress={() => router.replace("/(tabs)/rewards")}
//       />
//     </View>
//   );
// }

// function TabButton({
//   icon,
//   activeIcon,
//   active,
//   onPress,
// }: {
//   icon: keyof typeof Ionicons.glyphMap;
//   activeIcon: keyof typeof Ionicons.glyphMap;
//   active: boolean;
//   onPress: () => void;
// }) {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <Ionicons
//         name={active ? activeIcon : icon}
//         size={26}
//         color={active ? COLORS.primary : COLORS.inactive}

//       />
//     </TouchableOpacity>
//   );
// }
// const styles = StyleSheet.create({
// container: {
//   position: "absolute",
//   bottom: 20,
//   left: 16,
//   right: 16,
//   height: 72,
//   backgroundColor: COLORS.background,
//   borderRadius: 36,

//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "space-between",
//   paddingHorizontal: 28,

//   // Shadow (matches design)
//   elevation: 10,
//   shadowColor: "#000",
//   shadowOpacity: 0.08,
//   shadowRadius: 12,
//   shadowOffset: { width: 0, height: 4 },
// },

// scanButton: {
//   width: 64,
//   height: 64,
//   backgroundColor: COLORS.scan,
//   borderRadius: 32,

//   justifyContent: "center",
//   alignItems: "center",

//   marginBottom: 30,

//   // Shadow for floating effect
//   elevation: 6,
//   shadowColor: "#000",
//   shadowOpacity: 0.15,
//   shadowRadius: 6,
//   shadowOffset: { width: 0, height: 3 },
// },

// });
