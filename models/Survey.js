const mongoose = require('mongoose');
const { Schema } = mongoose;
import RecipientSchema from './Recipient';

const surveysSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model('surveys', surveysSchema);
