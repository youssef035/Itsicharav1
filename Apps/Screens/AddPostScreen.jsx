import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../FirebaseConfig";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

export default function AddPostScreen() {
  const db = getFirestore(app);

  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);

    const querySnapshot = await getDocs(collection(db, "Cities"));

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setCategoryList((CategoryList) => [...CategoryList, doc.data()]);
    });
  };

  return (
    <View className="p-10">
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          image: "",
        }}
        onSubmit={(value) => console.log(value)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={values?.title}
              onChangeText={handleChange("title")}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values?.desc}
              onChangeText={handleChange("desc")}
            />
            <TextInput
              style={styles.input}
              placeholder="price"
              value={values?.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
            />
            <Picker
              selectedValue={values?.category}
              onValueChange={handleChange("category")}
              style={styles.input}
            >
              {CategoryList &&
                CategoryList.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.name}
                    value={item.name}
                  />
                ))}
            </Picker>
            <Button className="mt-7" onPress={handleSubmit} title="submit" />
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
    marginBottom: 5,
    marginTop: 10,
    fontSize: 17,
  },
});
