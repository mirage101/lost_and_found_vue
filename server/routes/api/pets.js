const express = require('express');
const router = express.Router();
const petsController = require('../../controllers/petsController');

// POST (create) a new pet
router.post('/', petsController.createPet);

// GET all pets
router.get('/', petsController.getAllPets);

// GET a single pet by ID
router.get('/:id', petsController.getPetById);

// PATCH (update) an existing pet
router.patch('/:id', petsController.updatePet);

// DELETE a pet
router.delete('/:id', petsController.deletePet);

module.exports = router;
