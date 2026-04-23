import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const shipping = cartTotal > 1000 ? 0 : 50;
  const total = cartTotal + shipping;

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (!address.street || !address.city || !address.state || !address.pincode) {
      toast.error('Please fill in all shipping details');
      return;
    }

    try {
      // 1. Create Order in DB
      const { data: dbOrder } = await api.post('/orders', {
        items: cartItems.map(item => ({
          product: item._id,
          title: item.title,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: total,
        itemsPrice: cartTotal,
        shippingPrice: shipping,
        shippingAddress: address,
        paymentMethod: 'razorpay'
      });

      // 2. Create Razorpay Order
      const { data: rzpData } = await api.post('/orders/razorpay', {
        amount: total
      });

      const key = import.meta.env.VITE_RAZORPAY_KEY;
      
      // MOCK CHECKOUT IF NOT CONFIGURED
      if (!key || key === 'your_razorpay_key_here') {
        const toastId = toast.loading('Simulating Payment...');
        setTimeout(async () => {
          try {
            await api.put(`/orders/${dbOrder._id}/pay`, {
              razorpay_order_id: rzpData.razorpayOrderId,
              razorpay_payment_id: 'pay_mock_' + Date.now(),
              razorpay_signature: 'mock_signature'
            });
            toast.success('Payment Successful (Demo Mode)!', { id: toastId });
            clearCart();
            navigate('/dashboard');
          } catch (error) {
            toast.error('Demo Payment Verification Failed', { id: toastId });
          }
        }, 1500);
        return;
      }

      const options = {
        key: key,
        amount: rzpData.amount,
        currency: 'INR',
        name: 'ANIME POSTER STORE',
        description: 'Posters Purchase',
        order_id: rzpData.razorpayOrderId,
        handler: async (response) => {
          try {
            await api.put(`/orders/${dbOrder._id}/pay`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            toast.success('Payment Successful!');
            clearCart();
            navigate('/dashboard');
          } catch (error) {
            toast.error('Payment Verification Failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#e3ff4d',
        },
      };

      if (!window.Razorpay) {
        toast.error('Razorpay SDK failed to load. Are you offline?');
        return;
      }

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Checkout failed');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container">
      <div className="empty-cart text-center animate-fade-in" style={{ padding: '80px 0' }}>
        <div className="empty-cart-icon"><ShoppingBag size={80} strokeWidth={1} style={{ opacity: 0.2 }} /></div>
        <h1 className="page-title">CART IS EMPTY</h1>
        <p className="hero-subtitle">Your collection is looking a bit empty. Summon some posters!</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '30px' }}>Browse Posters</Link>
      </div>
    </div>
    );
  }

  return (
    <motion.div 
      className="cart-page container"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="page-title">YOUR <br /> CART</h1>
      
      <div className="cart-layout">
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.imageUrl} alt={item.title} />
              </div>
              
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <div className="cart-item-price">₹{item.price}</div>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
                
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <Link to="/products" className="continue-shopping">
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        <div className="cart-summary">
          <div className="shipping-form" style={{ marginBottom: '30px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <MapPin size={18} color="var(--accent)" /> SHIPPING DESTINATION
            </h4>
            <div className="form-group" style={{ display: 'grid', gap: '15px' }}>
              <input
                type="text"
                name="street"
                placeholder="Street Address / Area"
                value={address.street}
                onChange={handleInputChange}
                style={{ padding: '12px', background: '#f5f5f5', border: '1px solid #ddd', color: '#111', borderRadius: '8px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleInputChange}
                  style={{ padding: '12px', background: '#f5f5f5', border: '1px solid #ddd', color: '#111', borderRadius: '8px' }}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleInputChange}
                  style={{ padding: '12px', background: '#f5f5f5', border: '1px solid #ddd', color: '#111', borderRadius: '8px' }}
                />
              </div>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleInputChange}
                style={{ padding: '12px', background: '#f5f5f5', border: '1px solid #ddd', color: '#111', borderRadius: '8px' }}
              />
            </div>
          </div>

          <h3>Order Manifest</h3>
          <div className="summary-row">
            <span>Items Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Cost</span>
            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Payable Amount</span>
            <span>₹{total}</span>
          </div>
          
          <button className="btn btn-primary checkout-btn" onClick={handleCheckout} style={{ width: '100%' }}>
            Proceed to Payment
          </button>
          
          <div className="payment-icons flex-center" style={{ marginTop: '20px', fontSize: '10px', opacity: 0.6 }}>
             <p>🔒 256-BIT SSL SECURE CHECKOUT • RAZORPAY</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
