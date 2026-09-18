import { useState, useEffect } from 'react';

const useProducts = (category = 'smartphones') => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://dummyjson.com/products/category/${category}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Transform DummyJSON data to match existing product structure
                const transformedProducts = data.products.map((product) => ({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.thumbnail,
                    description: product.description,
                    category: product.category,
                    rating: product.rating,
                }));

                setProducts(transformedProducts);
            } catch (err) {
                console.error('Error fetching products from DummyJSON:', err);
                setError(err.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    return { products, loading, error };
};

export default useProducts;
