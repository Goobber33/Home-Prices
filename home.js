import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Home() {
  const [location, setLocation] = useState('San Diego');
  const [averageHomePrice, setAverageHomePrice] = useState('N/A');
  const [showResults, setShowResults] = useState(false);

  const fetchHomePrices = () => {
    fetch(`http://192.168.1.134:3001/api/home-prices?location=${location}`)
      .then(response => response.json())
      .then(data => {
        setAverageHomePrice(data.average_price || 'N/A');
        setShowResults(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setShowResults(false);
      });
  };

  const handleSearch = () => {
    setShowResults(false); // Hide previous results while fetching new ones
    fetchHomePrices();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Home Prices and Interest Rates</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location..."
        onChangeText={text => setLocation(text)}
        value={location}
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSearch} />
      </View>
      {showResults && (
        <View style={styles.infoCard}>
          <Text>Average Home Price: {averageHomePrice}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: '700',
    color: '#333',
  },
  input: {
    height: 48,
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 50,
    marginBottom: 16,
  },
  locationBox: {
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 6,
    backgroundColor: '#007aff',
  },
  locationText: {
    color: '#fff',
    fontWeight: '600',
  },
  infoCard: {
    padding: 20,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  infoText: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});
