import { View, Text } from "react-native";
import { Button } from "@ui-kitten/components";
import styles from "./Style";

/** SubmissionForm: 6th form step
 *
 * props:
 *    handleSubmit() - callback for submission
 *    applicanData - amalgam of applicant's form data
 *
 * App -> SubmissionForm
 */
function SubmissionForm({handleSubmit, applicantData}) {
  return (
    <View style={styles.container}>
      <Text>Ensure your information is correct:</Text>
      {Object.keys(applicantData).map(
        k => <Text key={k} >{k}: {applicantData[k]}</Text>
      )}
      <Button style={styles.button}  onPress={handleSubmit}>Submit Your Application</Button>
    </View>
  );
}

export default SubmissionForm;
