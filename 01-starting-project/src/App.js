import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import { uiActions } from './components/store/uislice';
import Notification from './components/UI/Notification';
import { cartActions } from './components/store/cartslice';

let isInitial = true ;
function App() {

  const dispatch = useDispatch();
 const showCart = useSelector(state => state.ui.cartIsVisible);
 const cart = useSelector(state => state.cart);
 const notification = useSelector(state => state.ui.notification);

 //sending cart data to firebase
 useEffect(()=>{
  const sendCartData = async () => {
    dispatch(
      uiActions.shownotification({
        status: 'pending',
        title: 'sending...',
        message: 'Sending Cart Data!!!',
      })
    );
    const response = await  fetch("https://redux-cart-1d233-default-rtdb.firebaseio.com/cart.json",
    {
      method: 'PUT',
      body : JSON.stringify(cart),
    });
    if (! response.ok) {
      throw new Error("Failed to send Cart Data!!!");
    }
    dispatch(
      uiActions.shownotification({
        status: 'success',
        title: 'success!',
        message: 'Sent Cart Data successfully!!',
      }))
  }
  if (isInitial) {
    isInitial= false;
    return;
  }

  if(cart.changed){
    sendCartData().catch((error)=>{
      dispatch(
        uiActions.shownotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent Cart Data Failed!!',
        }))
    })
  }
 },[cart,dispatch]);

//fetching cart data from firebase
useEffect(()=>{

  const fetchCartData = async () => {

    dispatch(
      uiActions.shownotification({
        status: 'fetching',
        title: 'fetching...',
        message: 'fetching Cart Data!!!',
      })
    );

    const response = await  fetch("https://redux-cart-1d233-default-rtdb.firebaseio.com/cart.json");

    if (! response.ok) {
      throw new Error("Failed to fetch Cart Data!!!");
    }
      const data = await response.json();
      dispatch(cartActions.replaceCart({
        items:data.items || [],
        totalQuantity : data.totalQuantity || 0,
      }));
      dispatch(
        uiActions.shownotification({
          status: 'success',
          title: 'success!',
          message: 'Fetching Cart Data successfully!!',
        }))
  }

  fetchCartData().catch((error)=>{
    dispatch(
      uiActions.shownotification({
        status: 'error',
        title: 'Error!',
        message: 'Fetching Cart Data Failed!!',
      }))
  })
 },[dispatch]);

  return (
    <Fragment>
    { notification && <Notification 
     status = {notification.status}
     title= {notification.title}
     message= {notification.message}
    ></Notification>}
    <Layout>
    { showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
