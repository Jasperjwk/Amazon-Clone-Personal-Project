// This is what the data layer initially looks like
export const initialState = {
    //We will start off with the user who isn't logged in

    basket: [],
    user: null
};

// When we have the data there, you can dispatch actions into the data
// export const actionTypes = {
//     SET_USER: "SET_USER",
// };

// Selector
export const getBasketTotal = (basket) => 
    // reduce - maps through the basket and tele up all the item prices and
    //  add it into the final amount and returns it
    basket?.reduce((amount, item) => item.price + amount, 0);

// Action - what you're trying to do, add to the basket? remove from basket?
const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        // If you just received an action, we want to return what the new data layer will look like
        case "ADD_TO_BASKET":
            return {
                // return what the new data layer will look like
                // return whatever it currently looks like but change 
                // the user to whatever we passed in as a user payload
                ...state,
                // Whatever the basket currently was, and whatever it decided
                // to add
                basket: [...state.basket, action.item]
            };
        
        case "EMPTY_BASKET":
            return {
                // Keep whatever is in the basket
                ...state,
                // Change the basket to its original empty array
                basket: []
            }
        
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                // Go through all of the basket items 
                // And if any of the basketItem.id matches the action id i parse in
                // Finds the first one and returns it to me
                (basketItem) => basketItem.id === action.id
            );
            
            let newBasket = [...state.basket];

            if (index >= 0) {
                // Go to the pointer inside the basket the item was and cutting it by one 
                newBasket.splice(index, 1);

            } else {
                console.warn(`Cant remove product (id: ${action.id}) as its not in basket!`)
            }

            return {
                ...state,
                basket: newBasket
            }

            case "SET_USER":
                return {
                    ...state,
                    user: action.user
                }

            default:
                return state;
    }
}

export default reducer;