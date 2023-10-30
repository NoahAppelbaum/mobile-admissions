import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ApplicationProvider, Select, SelectItem } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';


export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "" //TODO: default radio?
  });

  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  //   setFormData(curr => ({
  //     ...curr,
  //     [name]: value
  //   }));
  // }

  const SELECT_OBJ = {
    0: "North America",
    1: "South America",
    2: "Europe",
    3: "other",
  };

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
            onSelect={index => setFormData(curr => ({ ...curr, location: SELECT_OBJ[index] }))}
        >
          <SelectItem title='North America' />
          <SelectItem title='South America' />
          <SelectItem title='Europe' />
          <SelectItem title='other' />
        </Select>

      </View>
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
