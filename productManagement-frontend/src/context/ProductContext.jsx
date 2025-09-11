import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ProductContext = createContext();
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("desc");
  const [confirmDialog, setConfirmDialog] = useState({ show: false, product: null });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const fetchProducts = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    console.log('Fetching products with search query:', searchQuery, 'category:', selectedCategory, 'sortBy:', sortBy,'sortField',sortField, 'sortOrder:', sortOrder, 'page:', page);
    try {
      const res = await axios.get("/api/products", {
        params: {
          category: selectedCategory,
          search: searchQuery,
          sortBy:sortField,
          sortOrder,
          page,
          limit,
        },
      });

      if (res.data.success) {
        setProducts((prev) =>
          reset ? res.data.data : [...prev, ...res.data.data]
        );
        const totalLoaded = (reset ? 0 : products.length) + res.data.data.length;
        if (totalLoaded >= res.data.total) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    fetchProducts(true);
  
  }, [selectedCategory, searchQuery, sortField,sortField, sortOrder]);

  // Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.scrollHeight &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // Load more on page change
  useEffect(() => {
    if (page > 1) fetchProducts();
    console.log(page);
    // eslint-disable-next-line
  }, [page]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/products/categories");
      if (response.data.success) {
        setCategories(["all", ...response.data.data]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

const addProduct = async (productData) => {
  try {
    const response = await axios.post("/api/products", productData);
    if (response.data.success) {
     
      await fetchProducts(true);
       toast.success("Product added successfully!");
      await fetchCategories();
      return { success: true };
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add product");
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add product",
    };
  }
};
const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`/api/products/${id}`, productData);
    if (response.data.success) {
      await fetchProducts(true)
      toast.success(" Product updated successfully!");
      return { success: true };
    }
  } catch (error) {
    toast.error(error.response?.data?.message || " Failed to update product");
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update product",
    };
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/products/${id}`);
    if (response.data.success) {
      
      await fetchProducts(true);
       toast.success("Product deleted successfully!");
      await fetchCategories();
      return { success: true };
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete product");
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete product",
    };
  }
};
  const handleCategoryFilter = (category) => setSelectedCategory(category);
  const handleSearch = (query) => setSearchQuery(query);
  const handleSort = (sortOption) => {
    console.log(sortOption);
  if (sortOption.includes("-")) {
   
    const [field, order] = sortOption.split("-");
    
    setSortBy(sortOption);   
    setSortField(field);  
    setSortOrder(order);  
    console.log(field , order)
  } else {
   setSortBy(sortOption); 
   setSortField(sortOption);
   setSortOrder("asc");  
 }
};
  const showConfirmDialog = (product) => setConfirmDialog({ show: true, product });
  const hideConfirmDialog = () => setConfirmDialog({ show: false, product: null });
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        selectedCategory,
        searchQuery,
        sortBy,
        sortOrder,
        confirmDialog,
        hasMore,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        handleSearch,
        handleCategoryFilter,
        handleSort,
        showConfirmDialog,
        hideConfirmDialog,
      }}
    >
      {children}
  </ProductContext.Provider>
  );
};
