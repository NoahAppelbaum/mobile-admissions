import { Text, View } from "react-native";
import { Select, SelectItem, Button, Input, IndexPath } from '@ui-kitten/components';
import { useState } from "react";
import styles from "./Style";

const EDUCATION_CHOICES = [
  { title: "High School or Equivalent", value: "high-school"},
  { title: "Some College (No Degree)", value: "some-college"},
  { title: "Associate Degree", value: "assoc"},
  { title: "Bachelor's Degree", value: "bachelor"},
  { title: "Master's Degree", value: "masters"},
  { title: "Doctorate", value: "phd"},
]

const WORK_STATUS_CHOICES = [
  {title: "Yes", value: "Yes"},
  {title: "No", value: "No"},
]


/** CareerForm: 2nd form step
 *
 * props:
 *    submitForm() - callback for submission
 * state:
 *    formData - {
 *                motivation,
 *                work_history,
 *                highest_ed_level,
 *                legally_authorized
 *               }
 *    selectedIndex - select dropdown selection
 *
 * App -> CareerForm
 */
function CareerForm({submitForm}) {
  const [formData, setFormData] = useState({
    motivation: "",
    work_history: "",
    highest_ed_level: EDUCATION_CHOICES[0].value,
    legally_authorized: WORK_STATUS_CHOICES[0].value,
  })

  const [selectedIndex, setSelectedIndex] = useState({
    education: new IndexPath(0),
    workStatus: new IndexPath(0),
  });


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

      <Select
        value={EDUCATION_CHOICES[selectedIndex.education - 1].title}
        selectedIndex={selectedIndex.education}
        onSelect={index => {
          setFormData(curr => (
            { ...curr, highest_ed_level: EDUCATION_CHOICES[index - 1].value }
          ));
          setSelectedIndex(curr => ({ ...curr, education: index }));
        }}
      >
        {EDUCATION_CHOICES.map(c => <SelectItem key={c.value} title={c.title} />)}
      </Select>

      <Text>Are you legally authorized to work in the United States?</Text>
        <Text>(this does not change your likelihood of being accepted into our
          program, it helps let us know how to best support your potential job
          search)
        </Text>
      <Select
        value={WORK_STATUS_CHOICES[selectedIndex.workStatus - 1].title}
        selectedIndex={selectedIndex.workStatus}
        onSelect={index => {
          setFormData(curr => (
            { ...curr, legally_authorized: WORK_STATUS_CHOICES[index - 1].value }
          ));
          setSelectedIndex(curr => ({ ...curr, workStatus: index }));
        }}
      >
        <SelectItem title="Yes" />
        <SelectItem title="No" />
      </Select>
      <Button style={styles.button} onPress={handleSubmit}>Next</Button>
    </View>
  )
}

export default CareerForm;
