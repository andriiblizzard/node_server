import mongoose from 'mongoose';

const TokenAddressSchema = new mongoose.Schema({
  current_token_address: {
    type: String,
    default: ''
  }
});

const Token = mongoose.model('TokenAddress', TokenAddressSchema);
export default Token;
