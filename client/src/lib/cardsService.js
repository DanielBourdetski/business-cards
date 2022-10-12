import httpService from './httpService';

export const getCards = async () => {
  const res = await httpService.get('/cards');
  return res.data;
};
export const getCard = async id => {
  const res = await httpService.get('/cards/' + id);
  console.log(res);
  return res;
};

/**
 * card object containing:
 * @property {string} name - The name of the business
 * @property {string} description - The description of the business.
 * @property {string} image - URL for the card (optional).
 * @property {string} phone - The phone number of the business.
 * @property {string} address - The address of the business.
 */
export const addCard = async card => {
  const res = await httpService.post('/cards', { ...card });
  return res;
};
export const deleteCard = async id => {
  const res = await httpService.delete('/cards/' + id);
  return res;
};
export const updateCard = async (card, cardId) => {
  const res = await httpService.put('/cards/' + cardId, card);
  return res;
};

export const cardService = {
  getCard,
  getCards,
  addCard,
  deleteCard,
  updateCard,
};
