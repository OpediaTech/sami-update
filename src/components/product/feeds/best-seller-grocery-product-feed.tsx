import { FC, useEffect, useState } from 'react';
import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import ProductsGridBlock from '../products-grid-block';
import { LIMITS } from '@framework/utils/limits';

interface ProductFeedProps {
  className?: string;
}

const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({ className }) => {
  const { data, isLoading, error } = useBestSellerGroceryProductsQuery({
    limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS,
  });

  // console.log('data dihan', data);

  const [serverProducts, setServerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Start from here');
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    try {
      const response = await fetch(`https://sami-project.herokuapp.com/api/products`, {
        method: 'GET',
        headers: {
          'access-control-allow-origin': '*',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);
      setServerProducts(result.products);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ProductsGridBlock
      sectionHeading="text-best-grocery-near-you"
      sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={serverProducts}
      serprdt={serverProducts}
      loading={loading}
      // error={error?.message}
      // limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
    />
  );
};
export default BestSellerGroceryProductFeed;
