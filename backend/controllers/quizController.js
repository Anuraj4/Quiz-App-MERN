const axios = require('axios');

const fetchQuizData = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.jsonserve.com/Uw5CrX');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz data' });
  }
};

module.exports = { fetchQuizData };
