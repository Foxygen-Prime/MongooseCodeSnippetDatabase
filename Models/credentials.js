const mongoose = require('mongoose');

const credentialsDataSchema = new mongoose.Schema({
    user: 'jimminy',
    password: 'cricket'
  },
  {
    user: 'alfred',
    password: 'hitchcock'
  },
  {
    user: 'marlon',
    password: 'brando'
  },
  {
    user: 'tupac',
    password: 'shakur'
  })

  const credentialsData = mongoose.model('credentialsData', credentialsDataSchema);
      module.exports = credentialsData;
