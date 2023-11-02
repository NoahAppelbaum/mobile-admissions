import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from '@ui-kitten/components';


/** ContactForm: 5th form step
 *
 * props:
 *    submitForm() - callback for submission
 * state:
 *    formData - {
 *                birthdate,
 *                phone,
 *                linked_in
 *               }
 *    selectedIndex - select dropdown selection
 *
 * App -> ContactForm
 */
function ContactForm({ submitForm }) {
  const [formData, setFormData] = useState({
    birthdate: "",
    phone: "",
    linked_in: "",
  });

  function handleSubmit() {
    submitForm(formData);
  }

  function formatBirthdate (dateText) {
    if(dateText.length > 10){
      return;
    }
    // fixme: wonky logic here w/ deletion and dash insertion.
    if(dateText.length < formData.birthdate.length){
      setFormData(curr => ({ ...curr, birthdate: dateText }));
      return;
    }

    if(dateText.length === 4){
      dateText += "-";
    }
    if(dateText.length === 7){
      dateText += "-"
    }

    setFormData(curr => ({ ...curr, birthdate: dateText}));
  }

  return (
    <View>

      <TextInput
        placeholder="What is your date of birth?"
        onChangeText={newText => formatBirthdate(newText)}
        value={formData.birthdate}
      />
      <Text>Must be in the format of YYYY-MM-DD</Text>

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
