// import VendorCard from '@components/cards/vendor-card';
// import { useShopsQuery } from '@framework/shop/get-shops';
// import Alert from '@components/ui/alert';
// import { useTranslation } from 'next-i18next';
// import Heading from '@components/ui/heading';

// const ShopsPageContent: React.FC = () => {
//   const { t } = useTranslation('common');
//   const { data, error } = useShopsQuery({
//     limit: 9,
//   });
//  const allstore :any = data?.shop?.data? data?.shop?.data : [];
//   if (error) return <Alert message={error?.message} />;

//   return (
//     <div className="pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8">
//       <div className="w-full xl:max-w-[1490px] mx-auto">
//         <Heading variant="titleLarge" className="mb-4 lg:mb-6">
//           {t('text-all-shops')}
//         </Heading>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
//           {allstore.length && allstore.map((item:any) => (
//             <VendorCard key={item.id} shop={item} />
//           ))}
//           {allstore && <h2>  No Store Availeable</h2>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopsPageContent;

import VendorCard from '@components/cards/vendor-card';
import { useShopsQuery } from '@framework/shop/get-shops';
import Alert from '@components/ui/alert';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Skeletnnn from './Skeletnnn';
import { useEffect, useState } from 'react';

const ShopsPageContent: React.FC = () => {
  const [serverShop, setServerShop] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation('common');
  const { data, error } = useShopsQuery({
    limit: 9,
  });

  useEffect(() => {
    console.log('Start from here');
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    try {
      const response = await fetch(
        'https://sami-project.herokuapp.com/api/store',
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
      setServerShop(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  console.log('Shops details: ', serverShop);
  if (error) return <Alert message={error?.message} />;
  return (
    <div className="pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8">
      <div className="w-full xl:max-w-[1490px] mx-auto">
        <Heading variant="titleLarge" className="mb-4 lg:mb-6">
          {t('text-all-shops')}
        </Heading>
        <Heading variant="titleLarge" className="mb-4 lg:mb-6">
          {t('text-all-shops')}
        </Heading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {!serverShop.length ? (
            <div>
              <p>Loading...</p>
              {/* <Skeletnnn /> */}
            </div>
          ) : (
            serverShop.map((item, index) => (
              <VendorCard key={index} shop={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopsPageContent;
