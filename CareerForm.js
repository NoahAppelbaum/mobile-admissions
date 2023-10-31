import { Text, View } from "react-native";
import { Select, SelectItem, Button, Input, InputProps } from '@ui-kitten/components';
import { useState } from "react";

const EDUCATION = {
  "High School or Equivalent": "high-school",
  "Some College (No Degree)": "some-college",
  "Associate Degree": "assoc",
  "Bachelor's Degree": "bachelor",
  "Master's Degree": "masters",
  "Doctorate": "phd"
}

WORK_STATUS = {
  0: "Yes",
  1: "No",
}

function CareerForm({submitForm}) {
  const [formData, setFormData] = useState({
    motivation: "",
    work_history: "",
    highest_ed_level: "",
    legally_authorized: "",
  })

  function handleSubmit() {
    submitForm(formData);
  }

  return (
    <View>
      <Input multiline={true} placeholder={"What is your motivation for becomin"+
      "g a software engineer?"}
        onChangeText={newText => setFormData(curr => ({ ...curr, motivation: newText }))}
      />
      <Input multiline={true} placeholder={"What has your career path looked l" +
        "ike so far?"}
        onChangeText={newText => setFormData(curr => ({ ...curr, work_history: newText }))}
        />

      <Text>What is your highest level of education?</Text>
      <Select onSelect={index => setFormData(curr => ({
        ...curr,
        highest_ed_level: EDUCATION[index]
      }))}
       >
        <SelectItem title="High School or Equivalent"/>
        <SelectItem title="Some College (No Degree)"/>
        <SelectItem title="Associate Degree"/>
        <SelectItem title="Bachelor's Degree"/>
        <SelectItem title="Master's Degree"/>
        <SelectItem title="Doctorate" />
      </Select>
      <Select onSelect={index => setFormData(curr => ({
        ...curr,
        legally_authorized: WORK_STATUS[index]
      }))}
       >
      <Text>Are you legally authorized to work in the United States?</Text>
        <Text>(this does not change your likelihood of being accepted into our
          program, it helps let us know how to best support your potential job
          search)
        </Text>
        <SelectItem title="Yes" />
        <SelectItem title="No" />
      </Select>
      <Button onPress={handleSubmit}>Next</Button>
    </View>
  )
}

export default CareerForm;
