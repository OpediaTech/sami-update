import { useEffect } from 'react';

type FooterItemProps = {
  id: string;
  name: string;
  price: string;
};
export const CheckoutCardFooterItem: React.FC<{
  item: FooterItemProps;
  setPrice: any;
}> = ({ item, setPrice }) => {
  // console.log('4242 4242 4242 4242', item.price.replace('$', ''));
  const remvd = item.price.replace('$', '');
  const remcc = remvd.replace(',', '');
  // console.log('remcc', remcc);

  useEffect(() => {
    setPrice(remcc);
  }, []);
  return (
    <div className="flex items-center w-full py-4 text-sm font-medium border-b lg:py-5 border-border-base text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
      {item.name}
      <span className="font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
        {item.price}
      </span>
    </div>
  );
};
