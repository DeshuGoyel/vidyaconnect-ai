import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function LiveClassScreen() {
  return (
    <Screen scroll={false}>
      <View style={styles.video}>
        <Text style={styles.name}>Teacher Video</Text>
      </View>
      <View style={styles.smallVideo}>
        <Text style={styles.name}>Student</Text>
      </View>
      <View style={styles.controls}>
        <Button title="Mute" icon="mic-off" variant="dark" />
        <Button title="Camera" icon="videocam" variant="dark" />
        <Button title="End" icon="call" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  video: { flex: 1, borderRadius: 24, backgroundColor: colors.dark, alignItems: "center", justifyContent: "center" },
  smallVideo: { position: "absolute", right: 28, top: 80, width: 112, height: 150, borderRadius: 18, backgroundColor: "#2B2B35", alignItems: "center", justifyContent: "center" },
  name: { color: "#fff", fontWeight: "900" },
  controls: { flexDirection: "row", gap: 10 }
});
