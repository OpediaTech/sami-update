import WishlistProductCard from '@components/product/wishlist-product-card';
import { FC, useEffect } from 'react';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
interface ProductWishlistProps {
  element?: any;
  className?: string;
}


const ProductWishlistGrid: FC<ProductWishlistProps> = ({
  element,
  className = '',
}) => {

  const limit = 35;
  let data:any = []
  const {  isLoading, error } = useWishlistProductsQuery({
    limit: limit,
  });


  let  data1:any 
  


  if (typeof window !== 'undefined') {
    console.log('You are on the browser')
    // 👉️ can use localStorage here
    data1  = localStorage?.getItem('AllWishlist')
    data  = JSON.parse(data1)
  } else {
    console.log('You are on the server')
    // 👉️ can't use localStorage
  }


  // let data1:any 
  // useEffect(() => {
  //   // Perform localStorage action
    
     
  //    console.log("Kichui nai ?",data)
  // }, [])




  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col">
          {isLoading && !data?.length
            ? Array.from({ length: 35 }).map((_, idx) => (
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              ))
            : data.length &&  data?.map((product: any) => (
                <WishlistProductCard
                  key={`product--key${product.id}`}
                  product={product}
                />
              ))}
        </div>
      )}
    </div>
  );
};
export default ProductWishlistGrid;
