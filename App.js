import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import { ApplicationProvider, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as eva from '@eva-design/eva';

import ApplyForm from './ApplyForm';
import CareerForm from './CareerForm';
import CodingExperienceForm from './CodingExperienceForm';
import GoalsForm from './GoalsForm';
import ContactForm from './ContactForm';
import SubmissionForm from './SubmissionForm';

const BASE_API = process.env.EXPO_PUBLIC_BASE_API;

/** Render all applicant forms
 * props: none
 * state:
 *    applicantData (amalgam of all forms)
 *    formStep (index that dictates which form to show)
 *
 * App -> ApplyForm, CareerForm, CodingExperienceForm,
 *        GoalsForm, ContactForm, SubmissionForm
 */
export default function App() {
  const [applicantData, setApplicantData] = useState({});
  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    async function loadSavedData () {
      const savedData = await getData("applicantData");
      if (savedData) {
        applicantData = savedData;
      }
    }
    loadSavedData()
  }, [])

  const ORDERED_FORMS = {
    0: <ApplyForm submitForm={submitForm} />,
    1: <CodingExperienceForm submitForm={submitForm} />,
    2: <CareerForm submitForm={submitForm} />,
    3: <GoalsForm submitForm={submitForm} />,
    4: <ContactForm submitForm={submitForm} />,
    5: <SubmissionForm handleSubmit={handleSubmit} applicantData={applicantData} />,
  }

  /** Store data in async storage.
   * Accepts key (string), object (object)
   */
  async function storeData (key, object){
    try {
      const jsonObject = JSON.stringify(object);
      await AsyncStorage.setItem(key, jsonObject);
    } catch (e) {
    }
  };

  /** Retrieve data (obj) from async storage, at key (string) */
  async function getData (key) {
    try {
      const storedData = await AsyncStorage.getItem(key);
      return storedData != null ? await storedData.json() : null;
    } catch (e) {
    }
  };

  /** Submit a set of form answers
   *
   * adds the form's data to the overarching applicantData, and updates
   * applicantData in asyncStorage.
   *
   * Steps the formStep state forward to render next form.
   */
  function submitForm(formData) {
    setApplicantData(curr => ({ ...curr, ...formData }));
    storeData("applicantData", applicantData);
    setFormStep(curr => curr + 1);
  }

  /** Submits applicant data to the SIS /applicant/ api endpoint */
  async function handleSubmit() {
    const response = await fetch(`http://10.0.0.69:8000/api/applicants/`, {
      method: "POST",
      body: JSON.stringify(applicantData),
      headers: {"Content-Type": "application/json"}
    });
    // const response = await fetch(`${BASE_API}/applicants/`)
  //   console.log(response);
    const responseData = await response.json();
    setFormStep(curr => curr + 1);
  //   console.log("response json:", responseData);
    // setServerResponse(responseData);
    // const response = await fetch("http://10.0.0.69:8000/api/applicants/");
    // const responseData = await response.json();
  }

  if (formStep > 5) {
    return (
      <View>
      <Text>Congratulations, your application is being processed!</Text>
    </View>
    )
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
        {/* <Button onPress={handleSubmit}>Submit Application</Button> */}
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
