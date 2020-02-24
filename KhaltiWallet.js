import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';

const KhaltiWallet = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [walletButtonLoading, setWalletButtonLoading] = useState('');
  // generate khalti wallet token
  const get_tokenNumber = () => {
    const total_price = '100';
    return fetch('https://khalti.com/api/payment/initiate/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_key: 'test_public_key_5dc9a48a33ca434089dbc34fb3a5435a',
        mobile: `${phoneNumber}`,
        amount: total_price * 100,
        product_identity: 'EGTKT',
        product_name: 'EGTKT-Online Bus Ticket Booking System',
      }),
    })
      .then(res => res.json())
      .then(data => {
        // dispatch({type: GET_TOKEN_NUMBER, payload: data});
        alert(data);
        data.mobile ? alert(`${data.mobile}`) : alert('VerifyCodeScreen');
      });
  };

  const onPressCheckOut = () => {
    () => {
      if (this.state.phoneNumber.length === 10) {
        setWalletButtonLoading(true);
        get_tokenNumber();
      } else {
        alert('Enter a valid and Khalti registered phone number');
      }
    };
  };

  return (
    <View style={styles.walletContainer}>
      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        placeholder="Mobile Number"
        style={styles.inputStyle}
        number-pad={true}
        value={phoneNumber}
        onChangeText={number => setPhoneNumber(number)}
      />

      <Button
        style={styles.buttonStyle}
        title="CheckOut"
        color="#773292"
        disabled={walletButtonLoading}
        onPress={onPressCheckOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  label: {
    margin: 7,
    fontSize: 16,
    fontWeight: '300',
  },
  inputStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 23,
    paddingLeft: 16,
    flex: 1,
    ...Platform.select({
      android: {
        minHeight: 46,
      },
      ios: {
        minHeight: 36,
      },
    }),
    color: '#000',
  },
  buttonStyle: {
    padding: 10,
  },
});

export default KhaltiWallet;
