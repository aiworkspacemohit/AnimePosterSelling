import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import api from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, loading, updateProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['orders', 'wishlist', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        const orderRes = await api.get('/orders/my');
        setOrders(orderRes.data);

        const wishlistRes = await api.get('/users/wishlist');
        setWishlist(wishlistRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    if (user) fetchData();
  }, [user, loading, navigate, refreshData]);

  // Sync wishlist with user context when it changes
  useEffect(() => {
    if (user?.wishlist && Array.isArray(user.wishlist)) {
      setWishlist(user.wishlist);
    }
  }, [user?.wishlist]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    try {
      const { data } = await api.put('/users/profile', { name });
      updateProfile({ name: data.name, wishlist: data.wishlist });
      toast.success('Profile updated! Legends never die.');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) return <div className="flex-center section">Summoning your data...</div>;
  if (!user) return null;

  return (
    <div className="dashboard-page container">
      <h1 className="page-title">MY <br /> ACCOUNT</h1>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="user-profile-header text-center">
            <div className="avatar-placeholder flex-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          <nav className="dashboard-nav">
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('orders');
                setRefreshData(prev => prev + 1);
              }}
            >
              <Package size={20} />
              YOUR HAUL
            </button>
            <button
              className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('wishlist');
                setRefreshData(prev => prev + 1);
              }}
            >
              <Heart size={20} />
              YOUR COLLECTION
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings');
                setRefreshData(prev => prev + 1);
              }}
            >
              <Settings size={20} />
              SETTINGS
            </button>
            <button className="nav-item logout" onClick={logout}>
              <LogOut size={20} />
              LOGOUT
            </button>
          </nav>
        </aside>

        <main className="dashboard-content">
          {activeTab === 'orders' && (
            <div className="tab-pane animate-fade-in">
              <h2 className="tab-title">RECENT ORDERS</h2>
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order._id} className="order-card">
                      <div className="order-info">
                        <h4>ORDER #{order._id.slice(-6).toUpperCase()}</h4>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString()} — ₹{order.totalPrice}</p>
                      </div>
                      <div className={`order-status ${order.status}`}>
                        {order.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state flex-center">
                  <Package size={64} strokeWidth={1} />
                  <h3>YOUR HAUL IS EMPTY</h3>
                  <p>Your summoned anime posters will appear here.</p>
                  <button className="btn btn-primary" onClick={() => navigate('/products')}>SHOP POSTERS</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="tab-pane animate-fade-in">
              <h2 className="tab-title">YOUR COLLECTION</h2>
              {wishlist.length > 0 ? (
                <div className="products-grid">
                  {wishlist.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="empty-state flex-center">
                  <Heart size={64} strokeWidth={1} />
                  <h3>COLLECTION IS EMPTY</h3>
                  <p>Save anime posters you love and buy them later.</p>
                  <button className="btn btn-primary" onClick={() => navigate('/products')}>BROWSE POSTERS</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-pane animate-fade-in">
              <h2 className="tab-title">SETTINGS</h2>
              <form onSubmit={handleUpdateProfile} className="settings-form">
                  <div className="form-group">
                    <label>FULL NAME</label>
                    <div className="input-wrapper">
                      <input type="text" name="name" defaultValue={user.name} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>EMAIL ADDRESS</label>
                    <div className="input-wrapper">
                      <input type="email" defaultValue={user.email} disabled />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginTop: '30px' }}>UPDATE PROFILE</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
