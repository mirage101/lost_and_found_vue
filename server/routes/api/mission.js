const express = require('express');
const router = express.Router();
const missionController = require('../../controllers/missionController');

// POST (create) a new mission
router.post('/', missionController.createMission);

// GET all missions
router.get('/', missionController.getAllMissions);

// GET a single mission by ID
router.get('/:id', missionController.getMissionById);

// PATCH (update) an existing mission
router.patch('/:id', missionController.updateMission);

// DELETE a mission
router.delete('/:id', missionController.deleteMission);

module.exports = router;
