// Configuración del estado global
import { createStore } from 'redux';

const initialState = {
  cart: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    default:
      return state;
  }
}

const store = createStore(cartReducer);

// Uso en un componente
import { useSelector, useDispatch } from 'react-redux';

function Product() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return <button onClick={() => addToCart({ id: 1, name: 'Product A' })}>Add to Cart</button>;
}


//Después, llamamos a este store en nuestro Provider general de React.