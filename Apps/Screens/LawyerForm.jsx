import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore"; // Import addDoc
import { app } from "../../FirebaseConfig";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function LawyerForm({ navigation }) {
  //state for the image
  const [image, setImage] = useState(null);

  //the Firebase Connection
  const db = getFirestore(app);

  const [CitiesList, setCitiesList] = useState([]);

  useEffect(() => {
    getCitiesList();
  }, []);

  const getCitiesList = async () => {
    setCitiesList([]);

    const querySnapshot = await getDocs(collection(db, "Cities"));

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setCitiesList((CitiesList) => [...CitiesList, doc.data()]);
    });
  };

  //method for the image

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-10">
      <Text className="text-[26px] text-center font-bold mt-0">
        Veuillez remplir ce formulaire
      </Text>
      <Formik
        initialValues={{
          Nom: "",
          Prenom: "",
          Tel: "",
          Email: "",
          Ville: "",
        }}
        onSubmit={async (values) => {
          try {
            // Add the submitted form data to Firebase
            await addDoc(collection(db, "LawyerInfos"), {
              firstName: values.Prenom,
              lastName: values.Nom,
              email: values.Email,
              phone: values.Tel,
              Ville: values.Ville,
              image: image,
              // Add other fields as needed
            });
            console.log("Lawyer info added successfully!");
            navigation.navigate("thanks");
          } catch (error) {
            console.error("Error adding lawyer info or sending email:", error);
          }

          // Navigate to "thanks" screen after submitting
          // navigation.navigate("thanks");
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={values?.Nom}
              onChangeText={handleChange("Nom")}
            />
            <TextInput
              style={styles.input}
              placeholder="Prenom"
              value={values?.Prenom}
              onChangeText={handleChange("Prenom")}
            />
            <TextInput
              style={styles.input}
              placeholder="Tel"
              value={values?.Tel}
              keyboardType="number-pad"
              onChangeText={handleChange("Tel")}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values?.Email}
              onChangeText={handleChange("Email")}
            />
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 15,
              }}
            >
              <Picker
                className="border-2 -mt-28"
                selectedValue={values?.Ville}
                onValueChange={(itemValue) => setFieldValue("Ville", itemValue)}
                //style={styles.input}
              >
                {CitiesList &&
                  CitiesList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
              </Picker>
            </View>
            <TouchableOpacity className="p-4 bg-emerald-700 rounded-full mt-10 w-32 translate-x-28 ">
              <Text
                className="text-white text-center text-[15px]"
                onPress={pickImage}
                title="ImageUpload"
              >
                Upload Image
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="p-4 bg-emerald-700 rounded-full mt-10 w-32 translate-x-28 ">
              <Text
                className="text-white text-center text-[15px]"
                onPress={handleSubmit} // Trigger Formik's onSubmit function
                title="submit"
              >
                soumettre
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    marginTop: 30,
    fontSize: 17,
  },
});
