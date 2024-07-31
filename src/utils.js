// utils.js
export const getTotals = (cart) => {
  const totalAmount = cart.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.amount * parseFloat(item.price);
  }, 0);

  return { totalAmount, totalPrice };
};
