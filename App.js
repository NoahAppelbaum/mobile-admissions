import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ApplicationProvider, Button } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import ApplyForm from './ApplyForm';
import CareerForm from './CareerForm';
import CodingExperienceForm from './CodingExperienceForm';
import GoalsForm from './GoalsForm';
import ContactForm from './ContactForm';

const BASE_API = process.env.EXPO_PUBLIC_BASE_API;

export default function App() {
  const [applicantData, setApplicantData] = useState({});
  const [formStep, setFormStep] = useState(0);
  console.log("BASE_API", BASE_API);


  const ORDERED_FORMS = {
    0: <ApplyForm submitForm={submitForm} />,
    1: <CodingExperienceForm submitForm={submitForm} />,
    2: <CareerForm submitForm={submitForm} />,
    3: <GoalsForm submitForm={submitForm} />,
    4: <ContactForm submitForm={submitForm} />,
  }


  function submitForm(formData) {
    setApplicantData(curr => ({ ...curr, ...formData }));
    setFormStep(curr => curr + 1);
  }


  async function handleSubmit() {
    const response = await fetch(`http://10.0.0.69:8000/api/applicants/`, {
      method: "POST",
      body: JSON.stringify(applicantData),
      headers: {"Content-Type": "application/json"}
    });
    // const response = await fetch(`${BASE_API}/applicants/`)
  //   console.log(response);
    const responseData = await response.json();
  //   console.log("response json:", responseData);
    // setServerResponse(responseData);
    // const response = await fetch("http://10.0.0.69:8000/api/applicants/");
    // const responseData = await response.json();
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <View style={styles.container}>
      <Text>Welcome to Rithm Application. So glad. To apply.</Text>
      <StatusBar style="auto" />
      {ORDERED_FORMS[formStep]}
        {formStep > 0 ? <Button onPress={() => setFormStep(curr => curr - 1)} >Back</Button> : ""}

      </View>

      {/* TODO: FOR DEVELOPMENT: */}
      <View>
      <Text>Applicant Data:</Text>
      {Object.keys(applicantData).map(
        k => <Text key={k} >{k}: {applicantData[k]}</Text>
        )}
        <Text>
          {formStep}
        </Text>
        <Button onPress={handleSubmit}>Submit Application</Button>
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
