import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ApplicationProvider, Select, SelectItem, Button } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

// TODO: .env -- remember how this works in JS, put API address in there
const BASE_API = "http://localhost:8000/api"


export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "" //TODO: default radio?
  });

  //TODO: for testing:
  const [serverResponse, setServerResponse] = useState("");

  const SELECT_REGIONS = {
    0: "North America",
    1: "South America",
    2: "Europe",
    3: "other",
  };

  async function handleSubmit() {
    const response = await fetch(`${BASE_API}/applicants/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {"Content-Type": "application/json"}
    });
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
        onChangeText={newText => setFormData(curr => ({...curr, firstName:newText}))}
        value={formData.firstName}
        />

        <TextInput
        placeholder="Last Name"
        onChangeText={newText => setFormData(curr => ({...curr, lastName:newText}))}
        value={formData.lastName}
        />

        <TextInput
        placeholder="Email Address"
        onChangeText={newText => setFormData(curr => ({...curr, email:newText}))}
        value={formData.email}
          />

        <Select
            onSelect={index => setFormData(curr => ({ ...curr, location: SELECT_REGIONS[index] }))}
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
        {serverResponse}
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
