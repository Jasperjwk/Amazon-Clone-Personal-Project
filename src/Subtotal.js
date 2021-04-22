import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router';

function Subtotal() {

    const [{ basket }, dispatch] = useStateValue();
    const history = useHistory();

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                <>
                    <p>
                    Subtotal ({basket.length} items): <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift
                    </small>
                </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            {/* In some areas, you see me using the Link component which is a really
            good way to get a link. If i want to programatically in any point 
            push the user somewhere, then i can use the history.push  */}
            <button onClick={e => history.push('/payment')}>Procced to Checkout</button>
        </div>
    )
}

export default Subtotal
