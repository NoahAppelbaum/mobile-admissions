import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "tomato",
    borderWidth: 0,
    color: "blue"
  },
  backButton: {
    backgroundColor: "white",
    borderColor: "tomato",
    color: "black",
    borderWidth: 1,
    borderRadius: 2.5,
    padding: 10,
    width: "98.5%",
  }
});

export default styles;