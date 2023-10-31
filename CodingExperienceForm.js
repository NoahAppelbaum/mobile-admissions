import { Text, View } from "react-native";
import { Select, SelectItem, Button } from '@ui-kitten/components';
import { useState } from "react";

const EXPERIENCE_LEVEL = {
  "No Experience": "none",
  "I can create variables and write conditionals": "vars",
  "I'm comfortable writing 'for' loops and working with arrays / objects": "loops",
  "I can comfortably write functions": "funcs",
  "I've built projects that combine HTML, CSS, and JavaScript": "html-css-js",
  "I've built a full-stack web application": "full-stack",
  "I have professional software engineering experience": "pro",
}

const private_prep_choice = {
  0: "Yes",
  1: "No",
}

function CodingExperienceForm({ submitForm }) {
  const [formData, setFormData] = useState({
    js_experience: "",
    private_prep: "",
  });

function handleSubmit() {
  submitForm(formData);
}


  return (
    <View>
      <Select
        onSelect={index => setFormData(curr => ({ ...curr, js_experience: EXPERIENCE_LEVEL[index] }))}
      >
        <SelectItem title="No Experience" />
        <SelectItem title="I can create variables and write conditionals" />
        <SelectItem title="I'm comfortable writing 'for' loops and working with arrays / objects" />
        <SelectItem title="I can comfortably write functions" />
        <SelectItem title="I've built projects that combine HTML, CSS, and JavaScript" />
        <SelectItem title="I've built a full-stack web application" />
        <SelectItem title="I have professional software engineering experience" />
      </Select>

      <Text>We have a free 2-Week Prep Course that prepares students for our Full-Time Software Engineering Course.
        Is this something you're interested in chatting about?</Text>
      <Select
        onSelect={index => setFormData(curr => ({ ...curr, private_prep: private_prep_choice[index] }))}
      >

        <SelectItem title="Yes"/>
        <SelectItem title="No"/>
      </Select>
      <Button onPress={handleSubmit}>Next</Button>

    </View>
  )
}

export default CodingExperienceForm;
