import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function Home() {
  const [location, setLocation] = useState('San Diego');
  const [averageHomePrice, setAverageHomePrice] = useState('N/A');
  const [homeTypesData, setHomeTypesData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const fetchHomePrices = () => {
    fetch(`http://192.168.1.134:3001/api/home-prices?location=${location}`)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data); // Logging the API response
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
          <Text>Average Home Price: {Number(averageHomePrice).toLocaleString("en-US", {style: "currency", currency: "USD"})}</Text>
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
        hasAnimation={true}  // Add this line
      />      
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f4f4f4',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
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
});
