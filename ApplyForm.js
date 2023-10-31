import { useState } from "react";

import { Select, SelectItem, Button } from '@ui-kitten/components';

const SELECT_REGIONS = {
  0: "namer",
  1: "samer",
  2: "europe",
  3: "other",
};

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
        onSelect={index => setFormData(curr => ({ ...curr, continent: SELECT_REGIONS[index] }))}
      >
        <SelectItem title='North America' />
        <SelectItem title='South America' />
        <SelectItem title='Europe' />
        <SelectItem title='other' />
      </Select>

      <Button onPress={handleSubmit}>Get Started!</Button>
    </View>
  );
}

export default ApplyForm;
