import { Picker } from "@react-native-picker/picker";
import React from "react";

export default function RegisterScreen({ navigation }) {
  const handleCityChange = (value) => {
    setCity(value);
  };

  const togglePickerVisibility = () => {
    setShowPicker(!showPicker);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        onChangeText={(text) => setName({ value: text, error: "" })}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TouchableOpacity onPress={togglePickerVisibility}>
        <Text style={styles.label}>Add City</Text>
      </TouchableOpacity>
      {showPicker && (
        <Picker
          selectedValue={city}
          onValueChange={handleCityChange}
          style={styles.picker}
        >
          <Picker.Item label="City 1" value="City 1" />
          <Picker.Item label="City 2" value="City 2" />
          {/* Add more Picker.Item components for each city */}
        </Picker>
      )}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
