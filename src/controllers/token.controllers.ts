import Token from '../models/token.models';
import { wrapWithError } from '../utils';

/**
 * Get the current token address
 * @returns string
 */
const getTokenAddress = async () => {
  try {
    const data = await Token.findOne();
    if (!data) return wrapWithError(true, 'No current token address!');
    return wrapWithError(false, data.current_token_address);
  } catch (error) {
    return wrapWithError(true, 'Error when getting current token address!');
  }
};

/**
 * Write current token address
 * @param currentTokenAddress : string
 * @returns Object
 */
const writeTokenAddress = async (currentTokenAddress: string) => {
  try {
    const data = await Token.findOne();
    if (!data) {
      const newToken = new Token({
        current_token_address: currentTokenAddress
      });
      const newOne = await newToken.save();
      return wrapWithError(false, newOne);
    } else {
      const updatedToken = await data.updateOne({
        current_token_address: currentTokenAddress
      });
      return wrapWithError(false, updatedToken);
    }
  } catch (error) {
    return wrapWithError(true, 'Error when writing current token address!');
  }
};

export {
  getTokenAddress,
  writeTokenAddress
};
