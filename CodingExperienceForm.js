import { Text, View } from "react-native";
import { Select, SelectItem, Button, IndexPath } from '@ui-kitten/components';
import { useState } from "react";

const EXPERIENCE_LEVEL = [
  { title: "No Experience", value: "none" },
  { title: "I can create variables and write conditionals", value: "vars" },
  { title: "I'm comfortable writing 'for' loops and working with arrays / objects", value: "loops" },
  { title: "I can comfortably write functions", value: "funcs" },
  { title: "I've built projects that combine HTML, CSS, and JavaScript", value: "html-css-js" },
  { title: "I've built a full-stack web application", value: "full-stack" },
  { title: "I have professional software engineering experience", value: "pro" },
];

const private_prep_choice = [
  {title: "Yes", value: "Yes"},
  {title: "No", value: "No"},
]

function CodingExperienceForm({ submitForm }) {
  const [formData, setFormData] = useState({
    js_experience: "",
    private_prep: "",
  });

  const [selectedIndex, setSelectedIndex] = useState({
    experience: new IndexPath(0),
    privatePrep: new IndexPath(0),
  });


function handleSubmit() {
  submitForm(formData);
}


  return (
    <View>
      <Select
        value={EXPERIENCE_LEVEL[selectedIndex.experience - 1].title}
        selectedIndex={selectedIndex.experience}
        onSelect={index => {
          setFormData(curr => (
            { ...curr, js_experience: EXPERIENCE_LEVEL[index - 1].value }
          ));
          setSelectedIndex(curr => ({...curr, experience: index}));
        }}
      >
        {EXPERIENCE_LEVEL.map(c => <SelectItem key={c.value} title={c.title}/>)}
        </Select>

      <Text>We have a free 2-Week Prep Course that prepares students for our Full-Time Software Engineering Course.
        Is this something you're interested in chatting about?</Text>
      <Select
        value={private_prep_choice[selectedIndex.privatePrep - 1].title}
        selectedIndex={selectedIndex.privatePrep}
        onSelect={index => {
          setFormData(curr => (
            {...curr, private_prep: private_prep_choice[index - 1].value}
          ));
          setSelectedIndex(curr => ({...curr, privatePrep: index}));
        }}
      >

        <SelectItem title="Yes"/>
        <SelectItem title="No"/>
      </Select>
      <Button onPress={handleSubmit}>Next</Button>

    </View>
  )
}

export default CodingExperienceForm;
