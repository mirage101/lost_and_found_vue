const express = require('express');
const router = express.Router();
const Advices = require('../models/Advices');

// GET all advices
router.get('/', async (req, res) => {
  try {
    const advices = await Advices.find();
    res.json(advices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single advice by ID
router.get('/:id', getAdvice, (req, res) => {
  res.json(res.advice);
});

// POST (create) a new advice
router.post('/', async (req, res) => {
  const { advice_title, advices_content } = req.body;

  if (!advice_title || !advices_content) {
    return res.status(422).json({ message: 'Invalid fields' });
  }

  const advice = new Advices({
    advice_title,
    advices_content,
  });

  try {
    const newAdvice = await advice.save();
    res.status(201).json(newAdvice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE an existing advice
router.patch('/:id', getAdvice, async (req, res) => {
  const { advice_title, advices_content } = req.body;

  if (advice_title != null) {
    res.advice.advice_title = advice_title;
  }
  if (advices_content != null) {
    res.advice.advices_content = advices_content;
  }

  try {
    const updatedAdvice = await res.advice.save();
    res.json(updatedAdvice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an advice
router.delete('/:id', getAdvice, async (req, res) => {
  try {
    await res.advice.deleteOne();
    res.json({ message: 'Advice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get advice by ID
async function getAdvice(req, res, next) {
  try {
    const advice = await Advices.findById(req.params.id);
    if (!advice) {
      return res.status(404).json({ message: 'Advice not found' });
    }
    res.advice = advice;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
