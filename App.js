import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ShadowPropTypesIOS,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Task from "./Task";

const App = () => {
  const [value, setValue] = useState("");
  const [points, setPoints] = useState(0);
  const [todos, setTodos] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  const [showTypeIcon, setShowTypeIcon] = useState(false);

  handleAddTodo = () => {
    if (value.length > 0) {
      setTodos([...todos, { text: value, key: Date.now(), checked: false }]);
      setValue("");
      setPoints(points + 2);
    }
  };

  handleDeleteTodo = (id) => {
    setPoints(points - 1);
    setTodos(
      todos.filter((todo) => {
        if (todo.key !== id) return true;
      })
    );
    if (showAlert) {
      Alert.alert("Alert!", "Your task is deleted due to time up!");
      setShowAlert(false);
    }
  };

  handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#5452F6",
      }}
    >
      <View style={styles.container}>
        <Text style={{ marginTop: "10%", fontSize: 24, color: "white" }}>
          Today
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            marginTop: 10,
            marginBottom: 24,
          }}
        >
          Point: {points}
        </Text>
        <View style={styles.textInputContainer}>
          <TextInput
            onFocus={() => setShowTypeIcon(true)}
            onBlur={() => setShowTypeIcon(false)}
            style={styles.textInput}
            // multiline={true}
            onChangeText={(value) => setValue(value)}
            placeholder={"Do it now!"}
            placeholderTextColor="white"
            value={value}
          />
          <TouchableOpacity onPress={() => handleAddTodo()}>
            <Icon
              name="plus"
              size={24}
              color="white"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        </View>
        {showTypeIcon && (
          <View
            style={{
              position: "relative",
            }}
          >
            <Image
              style={{
                width: 24,
                height: 24,
                position: "absolute",
                left: "-47%",
                top: 16,
              }}
              source={require("./icons8-typing-50.png")}
            />
          </View>
        )}
        <ScrollView>
          {todos.map((task) => (
            <Task
              text={task.text}
              key={task.key}
              checked={task.checked}
              setChecked={() => handleChecked(task.key)}
              delete={() => handleDeleteTodo(task.key)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    minHeight: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
  },
  taskWrapper: {
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "baseline",
    borderColor: "#D0D0D0",
    borderBottomWidth: 0.5,
    width: "100%",
    alignItems: "stretch",
    minHeight: 40,
  },
  task: {
    paddingBottom: 20,
    paddingLeft: 10,
    paddingTop: 6,
    borderColor: "white",
    borderBottomWidth: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "rgb(222,222,222)",
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 5,
  },
});
