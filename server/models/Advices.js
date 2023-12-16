const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdvicesSchema = Schema(
  {
    advice_title: {
      type: String,
      required: true,
    },
    advices_content: {
      type: String,
      required: true,
    },
  },
  
);

module.exports = mongoose.model("Advices", AdvicesSchema);
