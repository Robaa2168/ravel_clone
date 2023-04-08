const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const url = 'https://www.freeforexapi.com/api/live?pairs=USDEUR,USDAUD,USDGBP,USDKES';

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
};
