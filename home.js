import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function Home() {
  const [location, setLocation] = useState('');
  const [averageHomePrice, setAverageHomePrice] = useState('N/A');
  const [homeTypesData, setHomeTypesData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const fetchHomePrices = () => {
    fetch(`http://192.168.1.134:3001/api/home-prices?location=${location}`)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        setAverageHomePrice(data.average_price || 'N/A');
        if (data.homeTypes) {
          setHomeTypesData(data.homeTypes);
        }
        setShowResults(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setShowResults(false);
      });
  };

  const handleSearch = () => {
    setShowResults(false);
    fetchHomePrices();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estate Mate</Text>
      <Image source={require('./house.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        placeholderTextColor="#888"
        onChangeText={text => setLocation(text)}
        value={location}
      />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.bootstrapButton} onPress={handleSearch}>
  <Text style={styles.buttonText}>Search</Text>
</TouchableOpacity>

      </View>
      {showResults && (
        <View style={styles.infoCard}>
          <Text>Average Home Price: {Number(averageHomePrice).toLocaleString("en-US", { style: "currency", currency: "USD" })}</Text>
        </View>
      )}
      {showResults && homeTypesData.length > 0 && (
        <PieChart
          data={homeTypesData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          hasAnimation={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 42,
    marginBottom: 24,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
    color: '#1a1a2e',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#d1d1e0',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  infoCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  bootstrapButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '50%',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  
});
