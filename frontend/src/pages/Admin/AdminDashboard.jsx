import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Check, Clock, Truck } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Naruto',
    imageUrl: '',
    description: '',
    countInStock: 10
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const { data } = await api.get('/products');
        setProducts(data.products);
      } else {
        const { data } = await api.get('/orders');
        setOrders(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
        description: product.description || '',
        countInStock: product.countInStock || 10
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        price: '',
        category: 'Naruto',
        imageUrl: '',
        description: '',
        countInStock: 10
      });
    }
    setShowModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
        toast.success('Product updated!');
      } else {
        await api.post('/products', formData);
        toast.success('Product created!');
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this legend permanently?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product removed!');
        fetchData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      toast.success(`Order marked as ${status}`);
      fetchData();
    } catch (error) {
      toast.error('Status update failed');
    }
  };

  return (
    <div className="admin-page container">
      <header className="admin-header">
        <h1 className="admin-title">POSTER <br /> ADMIN</h1>
        <div className="admin-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            PRODUCTS
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            ORDERS
          </button>
        </div>
      </header>

      <div className="admin-content">
        {activeTab === 'products' ? (
          <div className="products-manager">
            <div className="flex-between" style={{ marginBottom: '30px' }}>
              <h2 style={{ fontFamily: 'Oswald', fontSize: '2rem' }}>MANAGE POSTERS</h2>
              <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                <Plus size={20} /> ADD POSTER
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>IMAGE</th>
                    <th>TITLE</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id}>
                      <td><img src={p.imageUrl} alt={p.title} className="product-thumb" /></td>
                      <td>{p.title}</td>
                      <td><span className="category-tag" style={{ margin: 0 }}>{p.category}</span></td>
                      <td>₹{p.price}</td>
                      <td>
                        <div className="action-btns">
                          <button className="edit-btn" onClick={() => handleOpenModal(p)}><Edit size={18} /></button>
                          <button className="delete-btn" onClick={() => handleDeleteProduct(p._id)}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="orders-manager">
            <h2 style={{ fontFamily: 'Oswald', fontSize: '2rem', marginBottom: '30px' }}>MANAGE ORDERS</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>USER</th>
                    <th>TOTAL</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id}>
                      <td>#{o._id.slice(-6).toUpperCase()}</td>
                      <td>{o.user?.name}</td>
                      <td>₹{o.totalPrice}</td>
                      <td>
                        <span className={`order-status ${o.status}`}>{o.status}</span>
                      </td>
                      <td>
                        <div className="action-btns">
                          {o.status === 'processing' && (
                            <button onClick={() => handleUpdateStatus(o._id, 'shipped')} title="Mark as Shipped"><Truck size={18} /></button>
                          )}
                          {o.status === 'shipped' && (
                            <button onClick={() => handleUpdateStatus(o._id, 'delivered')} title="Mark as Delivered"><Check size={18} /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3>{editingProduct ? 'EDIT LEGEND' : 'ADD NEW LEGEND'}</h3>
              <button onClick={() => setShowModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="auth-form">
              <div className="form-group">
                <label>POSTER TITLE</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className="flex" style={{ gap: '20px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>PRICE (₹)</label>
                  <div className="input-wrapper">
                    <input 
                      type="number" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>CATEGORY</label>
                  <select 
                    style={{ padding: '15px', border: 'var(--border-width) solid var(--bg-dark)', borderRadius: 'var(--radius-full)', fontWeight: 600 }}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Naruto">Naruto</option>
                    <option value="Demon Slayer">Demon Slayer</option>
                    <option value="One Piece">One Piece</option>
                    <option value="Death Note">Death Note</option>
                    <option value="Wind Breaker">Wind Breaker</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>IMAGE URL</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>DESCRIPTION</label>
                <textarea 
                  style={{ padding: '15px', border: 'var(--border-width) solid var(--bg-dark)', borderRadius: 'var(--radius-md)', minHeight: '100px', fontWeight: 600 }}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                {editingProduct ? 'UPDATE POSTER' : 'ADD POSTER'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
