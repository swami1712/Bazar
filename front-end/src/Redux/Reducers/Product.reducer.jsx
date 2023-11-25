// productReducer.js
const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLICK_PRODUCT":
      const { productId } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === productId ? { ...product, clicked: true } : product
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
