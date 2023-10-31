import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from '@ui-kitten/components';




function ContactForm({ submitForm }) {
  const [formData, setFormData] = useState({
    birthdate: "",
    phone: "",
    linked_in: "",
  });

  function handleSubmit() {
    submitForm(formData);
  }

  return (
    <View>

      <TextInput
        placeholder="What is your date of birth?"
        onChangeText={newText => setFormData(curr => ({ ...curr, birthdate: newText }))}
        value={formData.birthdate}
      />

      <TextInput
        placeholder="What is your phone number?"
        onChangeText={newText => setFormData(curr => ({ ...curr, phone: newText }))}
        value={formData.phone}
      />

      <TextInput
        placeholder="Your LinkedIn Profile"
        onChangeText={newText => setFormData(curr => ({ ...curr, linked_in: newText }))}
        value={formData.linked_in}
      />
      <Text>If you don't have one, just leave it blank</Text>


      <Button onPress={handleSubmit}>Get Started!</Button>
    </View>
  );
}

export default ContactForm;
