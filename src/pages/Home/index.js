import React, { useState, useContext, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, FlatList, StatusBar, Keyboard } from "react-native";
import firebase from "../../services/FirebaseConnection";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import Card from "../../components/Card";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Home = () => {

    const [ task, setTask ] = useState('');
    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);
    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        async function loadTasks(){
            await firebase.database().ref("tasks").child(user.uid).on("value", (snapshot) => {
                setTasks([]);
                snapshot.forEach((item) => {
                    let data = {
                        nome: item.val().nome,
                        key: item.key,
                        done: item.val().done
                    }

                    setTasks(oldArray => [...oldArray, data])
                })
            })
        }

        loadTasks()
    }, [])

    async function addTask(){
        const taskRef = firebase.database().ref("tasks").child(user.uid);
        const key = taskRef.push().key;

        await taskRef.child(key).set({
            nome: task,
            done: false
        })
        .then(() => {
            console.log("Tarefa adicionada com sucesso!")
            Keyboard.dismiss();
            setTask("")
        })
        .catch(error => console.log(error))
    }

    const handleAddTask = () => {
        if(task !== ""){
            addTask()
        }else{
            alert("Digite algo antes de adicionar!")
        }
    }

    async function doneTask(id, done){
        let userRef = firebase.database().ref("tasks").child(user.uid);
        await userRef.child(id).update({
            done: !done
        })
        .then(() => {
            console.log("Tarefa atualizada!")
        })
        .catch(error => console.log(error))
    }

    async function deleteTask(id){
        let userRef = firebase.database().ref("tasks").child(user.uid);
        await userRef.child(id).remove()
        .then(() => {
            console.log("Tarefa deletada com sucesso!")
        })
        .catch(error => console.log(error))
    }

    const handleSignOut = () => {
        firebase.auth().signOut();
        setUser(null)
        navigation.navigate("SignIn")
    }

    return(
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="light-content" />

            <TouchableOpacity style={styles.exit} onPress={handleSignOut}>
                <Text style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}}>Sair</Text>
                <FontAwesome name="sign-out" style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}} />
            </TouchableOpacity> 

            <View style={styles.header}>
                <TextInput
                    value={task}
                    onChangeText={(value) => setTask(value)}
                    placeholder="Adicionar tarefa..."
                    placeholderTextColor={"gray"}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.btn} onPress={handleAddTask}>
                    <Text style={{fontSize: 20, color: '#FFF'}}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.key}
                renderItem = {({ item }) => <Card data={item} doneTask={doneTask} deleteTask={deleteTask} />}
                style={styles.tasksContainer}
            />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0531',
    },

    header: {
        height: 40,
        paddingHorizontal: 32,
        marginTop: 55,
        flexDirection: "row",
        gap: 5
    },

    input: {
        backgroundColor: '#272244',
        color: "#FFF",
        width: '88%',
        paddingLeft: 15,
        fontSize: 15
    },

    btn: {
        height: "100%",
        backgroundColor: "#C6409A",
        justifyContent:'center',
        alignItems: 'center',
        width: "12%",
    },

    exit: {
        position: 'absolute',
        left: 32,
        top: 32,
        flexDirection: "row",
        alignItems: 'center',
        gap:5
    },

    tasksContainer: {
        paddingHorizontal: 32,
        marginTop: 25,
        gap: 15,
    }
})

export default Home;