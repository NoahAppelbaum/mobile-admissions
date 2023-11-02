import { Text, View, } from "react-native";
import { Select, SelectItem, Button, Input, IndexPath } from '@ui-kitten/components';
import { useState } from "react";
import styles from "./Style";

//TODO: pull upcoming cohorts from db?
const COHORT_CHOICES = [
  { title: "February 2024, Online", value: "r99"},
  { title: "April 2024, Online", value: "r100"},
  { title: "June 2024, Online", value: "r101"},
];

const COMMIT_CHOICES = [
  { title: "Yes", value: "Yes"},
  { title: "No", value: "No"},
];

const FOUND_CHOICES = [
  { title: "Reddit", value: "reddit" },
  { title: "Google Search", value: "search" },
  { title: "Friend", value: "referral" },
  { title: "Social Media", value: "social" },
  { title: "Rithm Event", value: "meetups" },
  { title: "Course Report", value: "course-report" },
  { title: "SwitchUp", value: "switchup" },
  { title: "Other", value: "other" }
];

const PAYMENT_CHOICES = [
  { title: "Upfront payment - 1, 2, or 4 installments", value: "upfront" },
  { title: "Upfront with Loan", value: "loan" },
  { title: "Deferred tuition (unavailable in CO and WV)", value: "isa" },
  { title: "Hybrid - Partial upfront, partial deferred tuition (unavailible in CO and WV)", value: "hybrid" },
  { title: "Hybrid with Loan - Partial upfront, partial deferred tuition (unavailable in CO and WV)", value: "hybrid-loan" },
  { title: "I'm unsure", value: "unsure" },
]

/** GoalsForm: 4th form step
 *
 * props:
 *    submitForm() - callback for submission
 * state:
 *    formData - {
 *                cohorts,
 *                learned_about_rithm,
 *                why_rithm,
 *                can_you_commit,
 *                planned_payment_method
 *               }
 *    selectedIndex - select dropdown selection
 *
 * App -> GoalsForm
 */
function GoalsForm({ submitForm }) {
  const [formData, setFormData] = useState({
    cohorts: COHORT_CHOICES[0].value,
    learned_about_rithm: FOUND_CHOICES[0].value,
    why_rithm: "",
    can_you_commit: COMMIT_CHOICES[0].value,
    planned_payment_method: PAYMENT_CHOICES[0].value
  });

  const [selectedIndex, setSelectedIndex] = useState({
    cohort: new IndexPath(0),
    learnedAbout: new IndexPath(0),
    payment: new IndexPath(0),
    commit: new IndexPath(0),
  });

  function handleSubmit() {
    submitForm(formData);
  }

  return (
    <View style={styles.container}>

      <Text>Ideally, when would you like to start our full-time program at Rithm School?</Text>
      {/* fixme: this needs to be multi-select. More goes into this. */}
      <Select style={styles.input}
        value={COHORT_CHOICES[selectedIndex.cohort - 1].title}
        selectedIndex={selectedIndex.cohort}
        onSelect={index => {
          setFormData(curr => (
            { ...curr, cohorts: COHORT_CHOICES[index - 1].value }
          ));
          setSelectedIndex(curr => ({ ...curr, cohort: index }));
        }}
      >
        {COHORT_CHOICES.map(c => <SelectItem key={c.value} title={c.title} />)}
      </Select>

      <Text>How did you find out about Rithm School?</Text>
      <Select style={styles.input}
        value={FOUND_CHOICES[selectedIndex.learnedAbout - 1].title}
        selectedIndex={selectedIndex.learnedAbout}
        onSelect={index => {
          setFormData(curr => (
            { ...curr, learned_about_rithm: FOUND_CHOICES[index - 1].value }
          ));
          setSelectedIndex(curr => ({ ...curr, learnedAbout: index }));
        }}
      >
        {FOUND_CHOICES.map(c => <SelectItem key={c.value} title={c.title} />)}
      </Select>

      <Input multiline={true} placeholder={"Why are you considering Rithm School?"}
        onChangeText={newText => setFormData(curr => ({ ...curr, why_rithm: newText }))}
      />

      <Text>
        All classes are delivered through live lectures, whether we are remote
         (via Zoom) or in person.
        During the dates of this cohort, will you live within 4 hours of Pacific
         Time, and are you able to make a commitment to a full-time program?
      </Text>

      <Select style={styles.input}
        value={COMMIT_CHOICES[selectedIndex.commit - 1].title}
        selectedIndex={selectedIndex.commit}
        onSelect={index => {
          setFormData(curr => (
            { ...curr, can_you_commit: COMMIT_CHOICES[index - 1].value }
          ));
          setSelectedIndex(curr => ({ ...curr, commit: index }));
        }}
      >
        <SelectItem title="Yes" />
        <SelectItem title="No" />

      </Select>

      <Text>How do plan to pay for the program?</Text>
      <Select style={styles.input}
        value={PAYMENT_CHOICES[selectedIndex.payment - 1].title}
        selectedIndex={selectedIndex.payment}
        onSelect={index => {
          setFormData(curr => (
            { ...curr, planned_payment_method: PAYMENT_CHOICES[index - 1].value }
          ));
          setSelectedIndex(curr => ({ ...curr, payment: index }));
        }}
      >
        {PAYMENT_CHOICES.map(c => <SelectItem key={c.value} title={c.title} />)}
      </Select>

      <Button style={styles.button} onPress={handleSubmit}>Next</Button>
    </View>
  );
}

export default GoalsForm;
