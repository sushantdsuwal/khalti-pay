import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import KhaltiWallet from './KhaltiWallet';
import KhaltiEbanking from './KhaltiEbanking';

const TAB = [{tab: 'E-Banking'}, {tab: 'Wallet'}];

const KHALTI_LOGO_URI =
  'https://upload.wikimedia.org/wikipedia/en/f/fd/Khalti_Digital_Wallet_Logo.png';

const Khalti = () => {
  const [activeTab, setActiveTab] = useState('E-Banking');

  const _renderTab = item => {
    return (
      <TouchableOpacity
        key={item.tab}
        onPress={() => setActiveTab(item.tab)}
        style={[styles.tab, activeTab === item.tab && styles.activeTab]}>
        <Text style={styles.tabText(activeTab === item.tab)}>{item.tab}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.khaltiContainerWrapper}>
        <Image
          style={styles.logo}
          source={{
            uri: KHALTI_LOGO_URI,
          }}
        />
        <View style={styles.tabBarContainer}>
          {TAB.map((item, i) => _renderTab(item, i))}
        </View>
        <View style={{height: height / 2.7}}>
          {activeTab === 'E-Banking' ? <KhaltiEbanking /> : <KhaltiWallet />}
        </View>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  khaltiContainerWrapper: {
    borderWidth: 1,
    elevation: 4,
    borderColor: '#639fff',
    backgroundColor: '#e9eef7',
    borderRadius: 10,
    marginHorizontal: 15,
  },
  logo: {
    alignSelf: 'center',
    height: height / 4 - 50,
    width: width / 2 - 25,
    resizeMode: 'contain',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: 10,
    alignContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  tab: {
    paddingVertical: 8,
    flex: 1,
  },
  tabText: tabText => ({
    textAlign: 'center',
    color: tabText ? 'white' : 'black',
  }),
  activeTab: {
    backgroundColor: '#773292',
  },
});

export default Khalti;
