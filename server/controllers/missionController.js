const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');

// Get all missions
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific mission by ID
router.get('/:id', getMission, (req, res) => {
  res.json(res.mission);
});

// Create a new mission
router.post('/', async (req, res) => {
  const { mission_content } = req.body;

  if (!mission_content) {
    return res.status(422).json({ message: 'Invalid fields' });
  }

  const mission = new Mission({
    mission_content,
  });

  try {
    const newMission = await mission.save();
    res.status(201).json(newMission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a mission
router.patch('/:id', getMission, async (req, res) => {
  const { mission_content } = req.body;

  if (mission_content != null) {
    res.mission.mission_content = mission_content;
  }

  try {
    const updatedMission = await res.mission.save();
    res.json(updatedMission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a mission
router.delete('/:id', getMission, async (req, res) => {
  try {
    await res.mission.remove();
    res.json({ message: 'Mission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get mission by ID
async function getMission(req, res, next) {
  let mission;
  try {
    mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.mission = mission;
  next();
}

module.exports = router;
