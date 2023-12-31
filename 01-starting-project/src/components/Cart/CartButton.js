import { uiActions } from '../store/uislice';
import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';



const CartButton = (props) => {

 const cartQuantity = useSelector(state => state.cart.totalQuantity)
 const dispatch =useDispatch();

 const toggleHandler = () =>{
  dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
