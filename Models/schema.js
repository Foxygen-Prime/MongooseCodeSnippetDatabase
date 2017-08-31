const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
        unique: true
      },
      body: String,
      optionalNotes: String,
      language: [String],
      tags: [String]
    })

    const codeSnippet = mongoose.model('codeSnippet', codeSnippetSchema);
        module.exports = codeSnippet;
