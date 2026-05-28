import { StyleSheet, Text } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { StarRating } from "@/components/ui/StarRating";
import { colors } from "@/constants/colors";

export default function RatingsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Rate Class</Text>
      <Card>
        <StarRating rating={5} />
        <Text style={styles.body}>How was the class?</Text>
      </Card>
      <Button title="Submit Review" icon="star" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  body: { color: colors.muted, marginTop: 12 }
});
