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

const KhaltiEbanking = () => {
  const [bankList, setBankList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankInfo, setBankInfo] = useState({});

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
      bank: bankInfo.idx,
      //TODO: deep linking needed
      return_url: 'http://example.bookshop.com/',
      source: 'custom',
    };

    console.log(body);

    fetch('https://khalti.com/api/ebanking/initiate/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    })
      .then(res => console.log('res', res))
      // .then(data => {
      //   console.log('data', data);
      // })
      .catch(error => {
        console.log('error', error);
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
  };

  const renderBankList = ({item}) => {
    return (
      <View style={styles.bankContent}>
        <TouchableOpacity
          onPress={() => {
            setBankInfo(item);
            setInputVisible(true);
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
          <Image source={{uri: `${bankInfo.logo}`}} style={styles.bankLogo} />

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
