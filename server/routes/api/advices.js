const express = require('express');
const router = express.Router();
const advicesController = require('../../controllers/advicesController');
// const authMiddleware = require('../../middleware/auth');

// POST (create) a new advice
router.post('/', advicesController.createAdvice);

// GET all advices
router.get('/', advicesController.getAllAdvices);

// GET a single advice by ID
router.get('/:id', advicesController.getAdviceById);

// PATCH (update) an existing advice
router.patch('/:id', advicesController.updateAdvice);

// DELETE an advice
router.delete('/:id', advicesController.deleteAdvice);

module.exports = router;
