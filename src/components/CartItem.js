import React from 'react'
import { ChevronDown, ChevronUp } from '../icons'
import { useDispatch } from 'react-redux';
import { removeItems, incDecHandler } from '../features/cart/cartSlice';

const CartItem = (props) => {
    const dispatch = useDispatch();
    const { id, img, title, price, amount } = props

    return (
        <article className='cart-item'>
            <img src={img} alt={title} />
            <div>
                <h4>
                    {title}
                </h4>
                <h4 className='item-price'>${price}</h4>
                <button className='remove-btn'
                    onClick={() => dispatch(removeItems(id))}
                >remove</button>
            </div>
            <div>
                <button
                    className='amount-btn'
                    onClick={() => dispatch(incDecHandler({ id, type: 'inc' }))}
                ><ChevronUp />
                </button>
                <p className='amount'>{amount}</p>
                <button
                    className='amount-btn'
                    onClick={() => dispatch(incDecHandler({ id, type: 'dec' }))}

                ><ChevronDown />
                </button>
            </div>
        </article>
    )
}

export default CartItem 