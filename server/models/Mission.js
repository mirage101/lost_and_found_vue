const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MissionSchema = Schema(
  {
    mission_content: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("Mission", MissionSchema);
