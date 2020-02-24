import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import App from './App';

const MainApp = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const updateModalState = (visible = false) => {
    setModalVisible(visible);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Open" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => updateModalState()}>
        <TouchableWithoutFeedback onPress={() => updateModalState()}>
          <View style={{flex: 0.5}} />
        </TouchableWithoutFeedback>
        <App />
        <TouchableWithoutFeedback onPress={() => updateModalState()}>
          <View style={{flex: 0.5}} />
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MainApp;
