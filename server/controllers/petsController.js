const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single pet by ID
router.get('/:id', getPet, (req, res) => {
  res.json(res.pet);
});

// POST (create) a new pet
router.post('/', async (req, res) => {
  const {
    reporter,
    status,
    name,
    specie,
    description,
    award,
    award_sum,
    map_coords,
    telephone,
    oway,
  } = req.body;

  if (!reporter || !status || !specie || !description || !map_coords || !telephone) {
    return res.status(422).json({ message: 'Invalid fields' });
  }

  const pet = new Pet({
    reporter,
    status,
    name,
    specie,
    description,
    award,
    award_sum,
    map_coords,
    telephone,
    oway,
  });

  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE an existing pet
router.patch('/:id', getPet, async (req, res) => {
  const {
    reporter,
    status,
    name,
    specie,
    description,
    award,
    award_sum,
    map_coords,
    telephone,
    oway,
  } = req.body;

  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      {
        reporter,
        status,
        name,
        specie,
        description,
        award,
        award_sum,
        map_coords,
        telephone,
        oway,
      },
      { new: true }
    );
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a pet
router.delete('/:id', getPet, async (req, res) => {
  try {
    await res.pet.deleteOne();
    res.json({ message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get pet by ID
async function getPet(req, res, next) {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.pet = pet;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
