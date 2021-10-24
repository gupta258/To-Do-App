import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
const Task = (props) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    setTimeout(() => {
      if (timeLeft === 1) {
        props.delete();
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
  }, [timeLeft]);

  return (
    <View style={styles.taskWrapper}>
      <TouchableOpacity onPress={() => props.setChecked()}>
        <Icon
          name={props.checked ? "check" : "square"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        {props.checked && <View style={styles.verticalLine}></View>}
        <Text style={styles.task}>{props.text}</Text>
      </View>
      <View>
        <Text
          style={[styles.time, { color: timeLeft > 10 ? "white" : "#F1482E" }]}
        >
          {timeLeft}
        </Text>
      </View>
      <Icon
        name="trash-2"
        size={24}
        color="white"
        style={{ marginLeft: "auto" }}
        onPress={props.delete}
      />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskWrapper: {
    marginTop: 12,
    flexDirection: "row",
    borderColor: "#FFFFFF",
    borderBottomWidth: 1.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },
  task: {
    paddingLeft: 10,
    borderColor: "#F0F0F0",
    paddingBottom: 3,
    // borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  time: {
    fontSize: 16,
    marginRight: 10,
  },
  verticalLine: {
    borderBottomColor: "white",
    borderBottomWidth: 4,
    marginLeft: 10,
    width: "100%",
    position: "absolute",
    marginTop: 15,
  },
});
