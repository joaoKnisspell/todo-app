import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
 
const Card = ({ data, doneTask, deleteTask }) => {

    return(
        <View style={data.done ? [styles.container, {backgroundColor: "rgba(198, 64, 154, 0.3)"}] : styles.container}>
            <Text style={data.done ? [styles.taskText, {textDecorationLine: 'line-through', color: '#C6409A'}] : styles.taskText}>{data.nome}</Text>

            <View style={styles.iconsArea}>
            <TouchableOpacity 
                style={styles.iconContainer}
                onPress={() => doneTask(data.key, data.done)}
            >
                <FontAwesome style={styles.icon} name="check" />
            </TouchableOpacity>

            <TouchableOpacity   
                onPress={() => deleteTask(data.key)}
            >
                <FontAwesome style={styles.icon} name="ban" />
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        minHeight: 40,
        backgroundColor: "#272244",
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: "row"
    },

    taskText: {
        color: "#FFF",
        fontSize: 15,
        width: '80%'
    },

    iconsArea: {
        flexDirection: "row",
        gap: 15,
        width: '20%',
        justifyContent: 'flex-end'
    },

    icon: {
        fontSize: 18,
        color: "#C6409A"
    }
})

export default Card;