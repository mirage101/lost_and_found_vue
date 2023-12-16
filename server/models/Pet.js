const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = Schema(
  {
    reporter: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },

    specie: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    award: {
      type: Boolean,
    },
    award_sum: {
      type: Number,
    },
    map_coords: {
      type: Array,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    oway: {
      type: String,
    },
  },
  {
    virtuals: {
      id: {
        get() {
          return this._id;
        },
      },
    },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Pet", PetSchema);
