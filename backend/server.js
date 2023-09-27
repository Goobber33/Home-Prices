require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/home-prices', async (req, res) => {
  const location = req.query.location || 'santa monica';
  const type = 'single_family,condos';

  const options = {
    method: 'GET',
    url: 'https://realtor16.p.rapidapi.com/forsale',
    params: {
      location,
      type,
    },
    headers: {
      'X-RapidAPI-Key': process.env.REALTOR_API_KEY,
      'X-RapidAPI-Host': process.env.REALTOR_API_HOST,
    },
  };
  
  try {
    const response = await axios.request(options);
    console.log('API returned:', response.data);
    console.log('Pretty printed API data:', JSON.stringify(response.data, null, 2));
  
    // Calculate the average home price
    const results = response.data.home_search.results;
    let total_price = 0;
    let count = 0;
    const homeTypesCount = {}; // Object to hold counts of each home type
    
    for (let i = 0; i < results.length; i++) {
      if (results[i].list_price) {
        total_price += results[i].list_price;
        count++;
      }
  
      // Counting home types
      const type = results[i].description ? results[i].description.type : 'Unknown';
      if (!homeTypesCount[type]) {
        homeTypesCount[type] = 1;
      } else {
        homeTypesCount[type]++;
      }
    }
    
    const average_price = total_price / count;
  
    // Convert homeTypesCount to an array suitable for Pie Chart
    const homeTypesArray = Object.keys(homeTypesCount).map(type => {
      return {
        name: type,
        population: homeTypesCount[type],
        color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      };
    });
  
    console.log('Average Home Price:', average_price);
    
    res.json({ api_data: response.data, average_price, homeTypes: homeTypesArray });
  
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
