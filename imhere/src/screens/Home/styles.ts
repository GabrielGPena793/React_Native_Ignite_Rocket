import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131016',
    flex: 1,
    padding: 20,
    paddingTop: 50
  },
  eventDate: {
    color: "#6B6B6B",
    fontSize: 16
  },
  eventName: {
    color: "#FDFCFE",
    fontWeight: "bold",
    fontSize: 24
  },
  input: {
    height: 56,
    backgroundColor: '#1F1E25',
    borderRadius: 5,
    color: "#FFF",
    padding: 16,
    fontSize: 16,
    flex: 1,
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
    backgroundColor: "#31cf67",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    width: "100%",
    flexDirection: "row",
    marginTop: 36,
    marginBottom: 42
  },
  listEmptyText: {
    color: "#FFF",
    fontSize: 14,
    textAlign: 'center'
  },
  cancel: {
    backgroundColor: "red"
  }
})
