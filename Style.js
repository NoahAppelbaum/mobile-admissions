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
    color: "blue",
    width: "98.5%",
    position: "absolute",
    bottom: 0,
  },
  backButton: {
    backgroundColor: "white",
    borderColor: "tomato",
    color: "black",
    borderWidth: 1,
    borderRadius: 2.5,
    padding: 10,
    width: "98.5%",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "98.5%",
    padding: 10,
    borderRadius: 2.5,
    marginBottom: 10,
  },

});

export default styles;
