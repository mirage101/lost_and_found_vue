const express = require('express');
const router = express.Router();
const Faq = require('../models/Faq');

// GET all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single FAQ by ID
router.get('/:id', getFaq, (req, res) => {
  res.json(res.faq);
});

// POST (create) a new FAQ
router.post('/', async (req, res) => {
  const { faq_title, faq_content } = req.body;

  if (!faq_title || !faq_content) {
    return res.status(422).json({ message: 'Invalid fields' });
  }

  const faq = new Faq({
    faq_title,
    faq_content,
  });

  try {
    const newFaq = await faq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE an existing FAQ
router.patch('/:id', getFaq, async (req, res) => {
  const { faq_title, faq_content } = req.body;

  if (faq_title != null) {
    res.faq.faq_title = faq_title;
  }
  if (faq_content != null) {
    res.faq.faq_content = faq_content;
  }

  try {
    const updatedFaq = await res.faq.save();
    res.json(updatedFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a FAQ
router.delete('/:id', getFaq, async (req, res) => {
  try {
    await res.faq.deleteOne();
    res.json({ message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get FAQ by ID
async function getFaq(req, res, next) {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.faq = faq;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
