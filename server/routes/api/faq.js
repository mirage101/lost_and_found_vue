const express = require('express');
const router = express.Router();
const faqController = require('../../controllers/faqController');

// POST (create) a new FAQ
router.post('/', faqController.createFaq);

// GET all FAQs
router.get('/', faqController.getAllFaqs);

// GET a single FAQ by ID
router.get('/:id', faqController.getFaqById);

// PATCH (update) an existing FAQ
router.patch('/:id', faqController.updateFaq);

// DELETE a FAQ
router.delete('/:id', faqController.deleteFaq);

module.exports = router;
