import { useState } from "react";
import {View, Text, TextInput} from "react-native"
import { Select, SelectItem, Button, IndexPath } from '@ui-kitten/components';

const CONTINENT_CHOICES = [
  { title: "North America", value: "namer" },
  { title: "South America", value: "samer" },
  { title: "Europe", value: "europe" },
  { title: "Other", value: "other" },
];

/**ApplyForm: first form step
 * props:
 * callback for submission
 *
 * App->ApplyForm
 */

function ApplyForm({ submitForm }){
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_in: "",
    continent: ""
  });

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  // const [selectedIndex, setSelectedIndex] = useState(0);

  function handleSubmit() {
    submitForm(formData);
  }

  return (
    <View>

      <TextInput
        placeholder="First Name"
        onChangeText={newText => setFormData(curr => ({ ...curr, first_name: newText }))}
        value={formData.first_name}
      />

      <TextInput
        placeholder="Last Name"
        onChangeText={newText => setFormData(curr => ({ ...curr, last_name: newText }))}
        value={formData.last_name}
      />

      <TextInput
        placeholder="Email Address"
        onChangeText={newText => setFormData(curr => ({ ...curr, email_in: newText }))}
        value={formData.email_in}
      />

      <Select
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

      <Button onPress={handleSubmit}>Get Started!</Button>

      {/* TODO: TESTING */}
      {Object.keys(formData).map(k => <Text key={k} >{k}: {formData[k]}</Text>)}
    </View>
  );
}

export default ApplyForm;
