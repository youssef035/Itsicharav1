import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function ThankLawyer({ navigation }) {
  return (
    <View className="p-12 mt-32">
      <Text className="text-[30px] text-center font-bold mt-0">
        Merci pour votre soumission{" "}
      </Text>
      <Image
        source={require("./../../assets/images/smile.png")}
        className="w-full h-[300px] object-cover mt-0"
      />
      <Text className="text-[18px] text-slate-500 text-center mt-5">
        notre équipe examinera votre candidature et vous contactera dans les
        plus brefs délais
      </Text>
      <TouchableOpacity className="p-4 bg-white rounded-full mt-3">
        <Text
          className="text-center text-[15px]"
          onPress={() => navigation.navigate("welcome")}
        >
          retour à l'écran d'accueil➲{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
