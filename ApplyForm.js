import { useState } from "react";
import {View, Text, TextInput} from "react-native"
import { Select, SelectItem, Button, IndexPath } from '@ui-kitten/components';
import styles from "./Style";

const CONTINENT_CHOICES = [
  { title: "North America", value: "namer" },
  { title: "South America", value: "samer" },
  { title: "Europe", value: "europe" },
  { title: "Other", value: "other" },
];

/** ApplyForm: 1st form step
 *
 * props:
 *    submitForm() - callback for submission
 * state:
 *    formData - {
 *                first_name,
 *                last_name,
 *                email_in,
 *                continent
 *                }
 *    selectedIndex - select dropdown selection
 *
 * App -> ApplyForm
 */

function ApplyForm({ submitForm }){
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_in: "",
    continent: CONTINENT_CHOICES[0].value
  });

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  function handleSubmit() {
    submitForm(formData);
  }

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 40,
        position: "absolute",
        top: 0,
        color: "tomato",
        fontFamily: "Trebuchet MS",

      }}>This is how you apply to Rithm now:
        Phones.
        The Future.
      </Text>
      <Text>Welcome to Rithm! Get Started Below.</Text>

      <TextInput style={styles.input}
        placeholder="First Name"
        onChangeText={newText => setFormData(curr => ({ ...curr, first_name: newText }))}
        value={formData.first_name}
      />

      <TextInput style={styles.input}
        placeholder="Last Name"
        onChangeText={newText => setFormData(curr => ({ ...curr, last_name: newText }))}
        value={formData.last_name}
      />

      <TextInput style={styles.input}
        placeholder="Email Address"
        onChangeText={newText => setFormData(curr => ({ ...curr, email_in: newText }))}
        value={formData.email_in}
      />

      <Select style={styles.input}
        value={CONTINENT_CHOICES[selectedIndex-1].title}
        selectedIndex={selectedIndex}
        onSelect={index => {
          setFormData(curr => (
            { ...curr, continent: CONTINENT_CHOICES[index-1].value }
            ));
          setSelectedIndex(index)
        }}
      >
        {CONTINENT_CHOICES.map((c => <SelectItem key={c.value} title={c.title} />))}
      </Select>

      <Button style={styles.button} onPress={handleSubmit}>Get Started!</Button>
    </View>
  );
}

export default ApplyForm;
