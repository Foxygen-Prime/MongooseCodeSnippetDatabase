const mongoose = require('mongoose');

const CodeSnippet = new mongoose.Schema({
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

    const CodeSnippet = mongoose.model('videoGameData', videoGameLibrarySchema);
        module.exports = videoGameData;
