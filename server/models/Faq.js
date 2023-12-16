const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FaqSchema = Schema(
  {
    faq_title: {
      type: String,
      required: true,
    },
    faq_content: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("Faq", FaqSchema);
