import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Button,
  Platform,
} from 'react-native';
import {Linking} from 'react-native';

const KhaltiEbanking = () => {
  const [bankList, setBankList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [logo, setLogo] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [eBankIdx, setEBankIdx] = useState(null);

  useEffect(() => {
    fetch('https://khalti.com/api/bank/?has_ebanking=true', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setBankList(data.records);
        setIsLoading(false);
      })
      .catch(err => {
        alert(err);
        setIsLoading(false);
      });
  }, []);

  const ebank_initiateTransaction = () => {
    const amount = '1000';
    const body = {
      public_key: 'test_public_key_5dc9a48a33ca434089dbc34fb3a5435a',
      mobile: mobileNumber,
      amount: amount,
      product_identity: 'book/id-120',
      product_name: 'A Song of Ice and Fire',
      bank: eBankIdx,
      source: 'web',
    };
    fetch('https://khalti.com/api/payment/initiate/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  const renderBankList = ({item}) => {
    return (
      <View style={styles.bankContent}>
        <TouchableOpacity
          onPress={() => {
            setEBankIdx(item.idx);
            setInputVisible(true);
            setBankName(item.name);
            setLogo(item.logo);
          }}
          style={styles.bankWrapper}>
          <Image source={{uri: `${item.logo}`}} style={styles.bankLogo} />
          <Text style={{textAlign: 'center'}}>{item.short_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressCheckOut = () => {
    if (mobileNumber.length === 10) {
      setButtonLoading(true);
      ebank_initiateTransaction();
    } else {
      alert('Enter a valid phone number');
    }
  };
  return (
    <>
      {!isLoading ? (
        <FlatList
          data={bankList}
          renderItem={renderBankList}
          keyExtractor={({idx}) => idx.toString()}
          ListHeaderComponent={<Text>Please select your bank</Text>}
          ListHeaderComponentStyle={styles.headerStyle}
          numColumns={3}
        />
      ) : (
        <ActivityIndicator
          style={styles.indicatorStyle}
          animating={isLoading}
          size="large"
        />
      )}

      {inputVisible && (
        <View style={styles.inputContainer}>
          <Image source={{uri: `${logo}`}} style={styles.bankLogo} />

          <TextInput
            placeholder="Mobile Number"
            style={styles.inputStyle}
            keyboardType={'phone-pad'}
            value={mobileNumber}
            onChangeText={number => {
              setMobileNumber(number);
            }}
          />
          <Button
            title="Check Out"
            color="#f194ff"
            disabled={buttonLoading}
            onPress={onPressCheckOut}
          />
        </View>
      )}
    </>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    height: height / 4 - 50,
    width: width / 2 - 25,
    resizeMode: 'contain',
  },
  activeText: {
    color: 'black',
  },
  activeText1: {
    color: 'white',
  },
  indicatorStyle: {
    flex: 1,
  },
  headerStyle: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bankContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bankWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100,
    width: 100,
  },
  bankLogo: {
    height: 35,
    width: 35,
    borderWidth: 0.5,
    resizeMode: 'cover',
    borderRadius: 35 / 2,
    borderColor: '#639fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
  },
  inputStyle: {
    marginHorizontal: 15,
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
  buttonStyle: {padding: 10, backgroundColor: '#773292'},
});

export default KhaltiEbanking;
