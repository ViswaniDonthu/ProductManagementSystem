import { useState } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import ProductForm from './components/ProductForm';
import AuthForm from './components/AuthForm';
import ConfirmDialog from './components/ConfirmDialog';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(false);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        onAddProduct={() => setShowProductForm(true)}
        onShowAuth={() => setShowAuthForm(true)}
      />
      <main className="main-content">
        <CategoryFilter />
        <ProductGrid 
          onEditProduct={(product) => {
            setEditingProduct(product);
            setShowProductForm(true);
          }}
        />
      </main>
      
      {showProductForm && (
        <ProductForm 
          product={editingProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}
      
      <ConfirmDialog />
       <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
