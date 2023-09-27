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
  
    // Calculate the average home price
    const results = response.data.home_search.results;
    let total_price = 0;
    let count = 0;
  
    for (let i = 0; i < results.length; i++) {
      if (results[i].list_price) { // Make sure the list_price exists
        total_price += results[i].list_price;
        count++;
      }
    }
  
    const average_price = total_price / count;
    console.log('Average Home Price:', average_price);
  
    // Send the API response along with average home price to client

    res.json({ api_data: response.data, average_price });
  
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
