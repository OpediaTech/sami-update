import { Fragment } from 'react';
import ProductCard from '@components/product/product-cards/product-card';
import type { FC } from 'react';
import { useProductsQuery } from '@framework/product/get-all-products';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import SectionHeader from '@components/common/section-header';
import { useModalAction } from '@components/common/modal/modal.context';
import slice from 'lodash/slice';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
interface ProductFeedProps {
  element?: any;
  className?: string;
  data?: any;
}
const AllProductFeed: FC<ProductFeedProps> = ({
  data,
  element,
  className = '',
}) => {
  const { t } = useTranslation('common');

  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,

    error,
  } = useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal('CATEGORY_VIEW');
  }
  // console.log("data", data)
  // console.log("data1", data.data)

  const totalPrd = data.data;

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between pb-0.5 mb-4 lg:mb-5 xl:mb-6">
        <SectionHeader sectionHeading="All Products" className="mb-0" />
        <div
          className="lg:hidden transition-all text-brand -mt-1.5 font-semibold text-sm md:text-15px hover:text-brand-dark"
          role="button"
          onClick={handleCategoryPopup}
        >
          {t('text-categories')}
        </div>
      </div>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 md:gap-4 2xl:gap-5">
          {isLoading ? (
            <>
              {totalPrd?.map((page: any, index: any) => {
                return (
                  // <Fragment key={index}>
                  //   {page?.map((product: Product) => (
                  //     <ProductCard
                  //       key={`121`}
                  //       product={product}
                  //     />
                  //   ))}
                  //   {element && <div className="col-span-full">{element}</div>}
                  //   {page.length! > 18 &&
                  //     page?.map(
                  //       (product: any) => (
                  //         <ProductCard
                  //           key={`product--key${product.id}`}
                  //           product={product}
                  //         />
                  //       )
                  //     )}
                  // </Fragment>
                  <ProductCard key={`product--key${index}`} product={page} />
                );
              })}
            </>
          ) : (
            <>
              {totalPrd?.map((page: any, index: any) => {
                return (
                  // <Fragment key={index}>
                  //   {page?.map((product: Product) => (
                  //     <ProductCard
                  //       key={`121`}
                  //       product={product}
                  //     />
                  //   ))}
                  //   {element && <div className="col-span-full">{element}</div>}
                  //   {page.length! > 18 &&
                  //     page?.map(
                  //       (product: any) => (
                  //         <ProductCard
                  //           key={`product--key${product.id}`}
                  //           product={page}
                  //         />
                  //       )
                  //     )}
                  // </Fragment>
                  <ProductCard key={`product--key${index}`} product={page} />
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProductFeed;

// import { Fragment } from 'react';
// import ProductCard from '@components/product/product-cards/product-card';
// import type { FC } from 'react';
// import { useProductsQuery } from '@framework/product/get-all-products';
// import ProductCardLoader from '@components/ui/loaders/product-card-loader';
// import SectionHeader from '@components/common/section-header';
// import { useModalAction } from '@components/common/modal/modal.context';
// import slice from 'lodash/slice';
// import Alert from '@components/ui/alert';
// import cn from 'classnames';
// import { useTranslation } from 'next-i18next';
// import { useRouter } from 'next/router';
// import { LIMITS } from '@framework/utils/limits';
// import { Product } from '@framework/types';
// interface ProductFeedProps {
//   element?: any;
//   className?: string;
//   data? : any
// }
// const AllProductFeed: FC<ProductFeedProps> = () => {

//   return (
//     <div >
//       <p>No Shops products found</p>
//     </div>
//   );
// };

// export default AllProductFeed;
