import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, Text } from 'react-native';
import { List, Button } from 'react-native-paper';
import styles from '../styles';

function Todo( { id, title, allowance, complete, parent } ) {
  async function toggleComplete() {
    await firestore()
      .collection('todos')
      .doc(id)
      .update({
        complete: !complete,
      });
  }

  deleteTask = (id) => {
    firestore()
      .collection('todos')
      .doc(id).delete();
  }

  const renderElement = () => {
    if (parent === "true") {
       return <Button labelStyle={{ fontSize: 24 }} color={'#6f6f6f'} icon="delete" style={styles.dltBtn} onPress={() => {deleteTask(id)}}></Button>
    }
    return null;
  }

  return (
    <View style={styles.listItem}>
        <List.Item
          style={styles.listTask}
          title={title}
          onPress={() => toggleComplete()}
          left={props => (
            <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
          )} 
          />
          <Text style={styles.subtext}>$ {allowance}</Text>
          {renderElement()}
    </View>
  );
}

export default Todo;