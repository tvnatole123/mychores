import React, {useState, useEffect} from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appbar, Button } from 'react-native-paper';
import styles from '../styles';
import Todo from './Todo'; 
import auth from '@react-native-firebase/auth';

const Todos = (user) => {
  const refUsers = firestore().collection('users');
  const ref = firestore().collection('todos');
  let person = Object.values(user);
  let email = person[0].email;

  const [ todo, setTodo ] = useState('');
  const [ allowance, setAllowance ] = useState('');
  const [ total, setTotal ] = useState(0);
  const [ username, setUsername ] = useState('');
  const [ parent, setParent ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ todos, setTodos ] = useState([]);

  async function addTodo() {
      await ref.add({
        title: todo,
        allowance: allowance,
        complete: false,
      });
      setTodo('');
      setAllowance('');
    }
    const onSignOut = () => {
      auth()
      .signOut()
      .then(() => {
          console.log('User signed out!');
          setUser(null);
        }
      )
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    }

    const getUserProfile = async () => {
      const querySnapshot = await refUsers.get();
      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.data().email === email) {
          setUsername(documentSnapshot.data().displayName);
          setParent(documentSnapshot.data().parent);
        }
      });
    };

    const getTotal = (list) => {
      let count = 0;
      for (let item in list) {  
        if(list[item].complete === true) {
          count += parseInt(list[item].allowance);
        }
      };
      setTotal(count);
    }

    useEffect(() => {
      getUserProfile();
    });  

    useEffect(() => {
        ref.onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const { title, allowance, complete } = doc.data();
          list.push({
            id: doc.id,
            title,
            allowance,
            complete,
          });
        });
        setTodos(list);
          getTotal(list);
        if (loading) {
          setLoading(false);
        }
      });
      }, []);

    if (loading) {
      return null; // or a spinner
    }

    const renderElements = () => {
      if (parent === "true") {
         return <>
                <TextInput placeholder='New Task' value={todo} onChangeText={setTodo} style={styles.input} />
                <TextInput placeholder='Allowance' value={allowance} onChangeText={setAllowance} style={styles.input} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addTodo()}>
                    <Text style={styles.buttonTitle}>Add Task</Text>
                </TouchableOpacity>
                </>
      }
      return null;
    }

    const lisItem = ({item}) => {
      item.parent = parent;
      return (<Todo {...item} />)
    }
    return (
        <>
          <Appbar style={styles.bar}>
            <Appbar.Content title={<Text style={styles.barText}> My Chores </Text>} />
          </Appbar>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome {username}</Text>
            <View style={styles.listContainer}>
            <FlatList
                  data={todos}
                  keyExtractor={(item) => item.id}
                  renderItem={lisItem}
              />
            </View>
          </View>
          <View style={styles.footerView}>
            <Text style={styles.title}>Total: $ {total} </Text>
            {renderElements()}
            <Text style={styles.footerText}>Sign out? <Text onPress={onSignOut} style={styles.footerLink}>Sign out</Text></Text>
          </View>
        </>
      );
}

export default Todos;