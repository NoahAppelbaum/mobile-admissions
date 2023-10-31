import { Text, View } from "react-native";
import { Select, SelectItem, Button, Input, InputProps } from '@ui-kitten/components';
import { useState } from "react";

//TODO: pull upcoming cohorts from db?
const COHORT_CHOICES = {
  0: "r99",
  1: "r100",
  2: "r101"
};

const FOUND_CHOICES = {
  0: "reddit",
  1: "search",
  2: "referral",
  3: "social",
  4: "meetups",
  5: "course-report",
  6: "switchup",
  7: "other"
};

const PAYMENT_CHOICES = {
  0: "upfront",
  1: "loan",
  2: "isa",
  3: "hybrid",
  4: "hybrid-loan",
  5: "unsure"
}


function GoalsForm({ submitForm }) {
  const [formData, setFormData] = useState({
    cohorts: "",
    learned_about_rithm: "",
    why_rithm: "",
    can_you_commit: "",
    planned_payment_method: ""
  });

  function handleSubmit() {
    submitForm(formData);
  }

  return (
    <View>

      <Text>Ideally, when would you like to start our full-time program at Rithm School?</Text>
      <Select
      multiSelect={true}
      onSelect={index => setFormData(curr => ({
        ...curr,
        cohorts: formData.cohorts + COHORT_CHOICES[index]
      }))}
      // FIXME: gotta fix this^ -- how does multi-select work, exactly?
      //    Can we add AND take away with selections?
      >
        <SelectItem title="February 2024, Online" />
        <SelectItem title="April 2024, Online" />
        <SelectItem title="June 2024, Online" />
      </Select>

      <Text>How did you find out about Rithm School?</Text>
      <Select onSelect={index => setFormData(curr => ({
        ...curr,
        learned_about_rithm: FOUND_CHOICES[index]
      }))}
      >
        <SelectItem title="Reddit" />
        <SelectItem title="Google Search" />
        <SelectItem title="Friend" />
        <SelectItem title="Social Media" />
        <SelectItem title="Rithm Event" />
        <SelectItem title="Course Report" />
        <SelectItem title="SwitchUp" />
        <SelectItem title="Other" />

      </Select>

      <Input multiline={true} placeholder={"Why are you considering Rithm School?"}
        onChangeText={newText => setFormData(curr => ({ ...curr, why_rithm: newText }))}
      />

      <Text>
        All classes are delivered through live lectures, whether we are remote
         (via Zoom) or in person. As such, we re quire that all applicants live
          within 4 hours (ahead or behind) of the local time in San Francisco.
          Our program typically runs from around 9:30 AM to 6 PM Pacific Time,
          five days a week.
        During the dates of this cohort, will you live within 4 hours of Pacific
         Time, and are you able to make a commitment to a full-time program?
      </Text>

      <Select
        onSelect={index => setFormData(curr => ({
          ...curr,
          can_you_commit: (index ? "No" : "Yes")
        }))}
      >
        <SelectItem title="Yes" />
        <SelectItem title="No" />

      </Select>

      <Select onSelect={index => setFormData(curr => ({
        ...curr,
        planned_payment_method: PAYMENT_CHOICES[index]
      }))}
      >
        <SelectItem title="Upfront payment - 1, 2, or 4 installments" />
        <SelectItem title="Upfront with Loan" />
        <SelectItem title="Deferred tuition (unavailable in CO and WV)" />
        <SelectItem title="Hybrid - Partial upfront, partial deferred tuition (unavailible in CO and WV)" />
        <SelectItem title="Hybrid with Loan - Partial upfront, partial deferred tuition (unavailable in CO and WV)" />
        <SelectItem title="I'm unsure" />

      </Select>

      <Button onPress={handleSubmit}>Next</Button>
    </View>
  );
}

export default GoalsForm;
