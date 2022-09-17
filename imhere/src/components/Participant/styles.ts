import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  name: {
    color: '#FFF',
    flex: 1,
    fontSize: 16,
    backgroundColor: '#1F1E25',
    height: 56,
    padding: 16,
    borderRadius: 5,
    marginRight: 12    

  },
  buttonText: {
    color: "#FFF",
    fontSize: 26
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#E23C44",
    alignItems: "center",
    justifyContent: "center"
  }
})