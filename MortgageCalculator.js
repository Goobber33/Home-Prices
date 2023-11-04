import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState(''); // in years
  const [monthlyPayment, setMonthlyPayment] = useState('');

  const calculateMortgage = () => {
    const principal = (propertyPrice || 0) - (downPayment || 0);
    const monthlyInterestRate = ((interestRate || 0) / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment = principal * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments)) /
      (Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1);

    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Property Price"
        onChangeText={text => setPropertyPrice(text ? parseFloat(text) : '')}
        value={propertyPrice.toString()}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Down Payment"
        onChangeText={text => setDownPayment(text ? parseFloat(text) : '')}
        value={downPayment.toString()}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Interest Rate (%)"
        onChangeText={text => setInterestRate(text ? parseFloat(text) : '')}
        value={interestRate.toString()}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Loan Term (years)"
        onChangeText={text => setLoanTerm(text ? parseFloat(text) : '')}
        value={loanTerm.toString()}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Calculate" onPress={calculateMortgage} />
      {monthlyPayment !== '' && (
        <Text style={styles.result}>Monthly Payment: ${monthlyPayment}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f5f9',
  },
  input: {
    height: 50,
    borderColor: '#d1d1e0',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  result: {
    marginTop: 16,
    fontSize: 18,
  },
});
