import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen({ navigation }) {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image
        source={require("./../../assets/images/Logo.png")}
        className="w-full h-[300px] object-cover mt-2"
      />
      <View className="p-10">
        <Text className="text-[30px] text-center font-bold mt-0">
          {" "}
          Conseils juridiques d'experts{" "}
        </Text>
        <Text className="text-[18px] text-slate-500 text-center mt-5">
          Accédez à des consultations juridiques expertes, où que vous soyez!
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="p-4 bg-emerald-400 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[18px]">
            se connecter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4 bg-white rounded-full mt-3">
          <Text
            className="text-center text-[15px]"
            onPress={() => navigation.navigate("signup")}
          >
            Continuer en tant qu'invité ➲{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-center text-[15px] mt-10">
          {" "}
          êtes vous avocat ? vous pouvez nous rejoindre ici
        </Text>
        <TouchableOpacity className="p-4 bg-emerald-700 rounded-full mt-1 w-32 translate-x-36 ">
          <Text
            className="text-white text-center text-[15px]"
            onPress={() => navigation.navigate("formule")}
          >
            {" "}
            Intégrez{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
