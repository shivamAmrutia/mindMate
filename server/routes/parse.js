const express = require('express');
const router = express.Router();
const { parseReminder } = require('../services/cohere');

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  try {
    const parsed = await parseReminder(prompt);
    res.json(parsed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to parse reminder' });
  }
});

module.exports = router;
