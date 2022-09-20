// import { FC, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useTranslation } from 'next-i18next';
// import Alert from '@components/ui/alert';
// import Button from '@components/ui/button';
// import ProductCard from '@components/product/product-cards/product-card';
// import ProductCardLoader from '@components/ui/loaders/product-card-loader';
// import cn from 'classnames';
// import { useProductsQuery } from '@framework/product/get-all-products';
// import { LIMITS } from '@framework/utils/limits';
// import { Product } from '@framework/types';

// interface ProductGridProps {
//   className?: string;
// }

// export const ProductGrid: FC<ProductGridProps> = ({ className = '' }) => {
//   const { t } = useTranslation('common');
//   const { query } = useRouter();
//   // const {
//   //   isFetching: isLoading,
//   //   isFetchingNextPage: loadingMore,
//   //   fetchNextPage,
//   //   hasNextPage,
//   //   data,
//   //   error,
//   // } = useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });

//   const [serverProducts, setServerProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log('Start from here');
//     getUser();
//   }, []);

//   async function getUser() {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://sami-project.herokuapp.com/api/products`, {
//         method: 'GET',
//         headers: {
//           'access-control-allow-origin': '*',
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       setLoading(false);
//       setServerProducts(result.products);
//       return result;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <>
//       <div
//         className={cn(
//           'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
//           className
//         )}
//       >
//         {
//           // error ? (
//           //   <div className="col-span-full">
//           //     <Alert message={error?.message} />
//           //   </div>
//           // ) :
//           loading && !serverProducts.length
//             ? Array.from({ length: 30 }).map((_, idx) => (
//                 <ProductCardLoader
//                   key={`product--key-${idx}`}
//                   uniqueKey={`product--key-${idx}`}
//                 />
//               ))
//             : serverProducts.map((page: any) => {
//                 return serverProducts.map((product: Product) => (
//                   <ProductCard
//                     key={`product--key-${product.id}`}
//                     product={product}
//                   />
//                 ));
//               })
//         }
//         {/* end of error state */}
//       </div>
//       {/* {hasNextPage && (
//         <div className="text-center pt-8 xl:pt-10">
//           <Button
//             loading={loadingMore}
//             disabled={loadingMore}
//             onClick={() => fetchNextPage()}
//           >
//             {t('button-load-more')}
//           </Button>
//         </div>
//       )} */}
//     </>
//   );
// };



import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useProductsQuery } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';

interface ProductGridProps {
  className?: string;
  data?: any | null;
  search?: any;
}

export const ProductGrid: FC<ProductGridProps> = ({
  className = '',
  search = false,
  data,
}) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  // const {
  //   isFetching: isLoading,
  //   isFetchingNextPage: loadingMore,
  //   fetchNextPage,
  //   hasNextPage,
  //   data,
  //   error,
  // } = useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });

  const [serverProducts, setServerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Start from here');
    search ? searchedDataShow(data && data) : getUser();
  }, [data]);

  console.log('serarch  prod: ', data);

  const searchedDataShow = (data: any) => {
    setLoading(false);
    setServerProducts(data);
  };

  async function getUser() {
    setLoading(true);
    try {
      const response = await fetch(
        'https://sami-project.herokuapp.com/api/products',
        {
          method: 'GET',
          headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

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
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className
        )}
      >
        {
          // error ? (
          //   <div className="col-span-full">
          //     <Alert message={error?.message} />
          //   </div>
          // ) :
          loading && !serverProducts.length
            ? [1,2,3,4].map((_, idx) => (
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              ))
            : // : serverProducts.map((page: any) => {
              //     return serverProducts.map((product: Product, index :any) => (
              //       <ProductCard
              //         key={index }
              //         product={product}
              //       />
              //     ));
              //   })
              serverProducts.map((product: Product, index: any) => (
                <ProductCard key={index} product={product} />
              ))
        }
        {/* end of error state */}
      </div>
      {/* {hasNextPage && (
        <div className="text-center pt-8 xl:pt-10">
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )} */}
    </>
  );
};
