import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ApplicationProvider, Select, SelectItem, Button } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

// TODO: .env -- remember how this works in JS, put API address in there
const BASE_API = "http://10.0.0.69:8000/api"


export default function App() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_in: "",
    continent: ""
  });

  //TODO: for testing:
  const [serverResponse, setServerResponse] = useState("");

  const SELECT_REGIONS = {
    0: "namer",
    1: "samer",
    2: "europe",
    3: "other",
  };

  async function handleSubmit() {
    // const response = await fetch(`${BASE_API}/applicants/`, {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: {"Content-Type": "application/json"}
    // });
    const response = await fetch(`${BASE_API}/applicants/`)
    console.log(response)
    const responseData = await response.json();
    setServerResponse(responseData);
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <View style={styles.container}>
      <Text>Welcome to Rithm Application. So glad. To apply.</Text>
      <StatusBar style="auto" />

      <View>

        <TextInput
        placeholder="First Name"
        onChangeText={newText => setFormData(curr => ({...curr, first_name:newText}))}
        value={formData.first_name}
        />

        <TextInput
        placeholder="Last Name"
        onChangeText={newText => setFormData(curr => ({...curr, last_name:newText}))}
        value={formData.last_name}
        />

        <TextInput
        placeholder="Email Address"
        onChangeText={newText => setFormData(curr => ({...curr, email_in:newText}))}
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
      {/* TODO: For testing: */}
      <Text>
        {serverResponse.results}
      </Text>
      </View>
     </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
