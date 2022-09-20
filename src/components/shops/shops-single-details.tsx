import { useEffect, useState } from 'react';
import { useShopQuery } from '@framework/shop/get-shop';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUI } from '@contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import { Element } from 'react-scroll';
import Container from '@components/ui/container';
import { Drawer } from '@components/common/drawer/drawer';
import ShopSidebar from '@components/shops/shop-sidebar';
import ShopSidebarDrawer from '@components/shops/shop-sidebar-drawer';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import { useTranslation } from 'next-i18next';
import useWindowSize from '@utils/use-window-size';

const ShopsSingleDetails: React.FC = () => {
  const [serverShop, setServerShop] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    query: { slug },
  } = useRouter();
  const { t } = useTranslation('common');
  const { isLoading } = useShopQuery(slug as string);
  const { openShop, displayShop, closeShop } = useUI();
  const { width } = useWindowSize();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

  // if (isLoading) return <p>Loading...</p>;
  const data: any = [];
  useEffect(() => {
    // console.log('Start from here');
    getUser();
  }, [getUser]);

  async function getUser() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://sami-project.herokuapp.com/api/store/${slug}`,
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
      // console.log('Total length:', result.dataLength);
      // console.log('Total store:', result.store);

      setServerShop(result);
      console.log('Total length Profucts:', result.data);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        className="flex justify-center w-full h-56 bg-center bg-no-repeat bg-cover md:h-64"
        style={{
          backgroundImage: `url(${
            width! <= 480
              ? 'https://images.unsplash.com/photo-1554982612-dee66ebddaec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'
              : 'https://images.unsplash.com/photo-1554982612-dee66ebddaec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'
          })`,
        }}
      />

      <div className="flex items-center px-4 py-4 border-b lg:hidden md:px-6 border-border-base mb-7">
        <div className="flex shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="Nahid Murad Abir"
            width={66}
            height={66}
            className="rounded-md"
          />
        </div>
        <div className="ltr:pl-4 rtl:pr-4">
          <h2 className="font-semibold text-brand-dark text-15px">
            {/* {data?.name}   */}
            dihan abir
          </h2>

          <button
            className="block text-sm font-medium transition-all text-brand hover:text-brand-muted"
            onClick={openShop}
          >
            {t('text-more-info')}
          </button>
        </div>
      </div>

      <Container>
        <Element
          name="grid"
          className="flex flex-col pb-16 lg:flex-row lg:pt-8 lg:pb-20"
        >
          <div className="shrink-0 hidden lg:block lg:w-80 xl:w-[350px] 2xl:w-96 lg:sticky lg:top-16 category-mobile-sidebar">
            <div className="border border-[#EFF2F4] shadow-vendorSidebar rounded-lg">
              <ShopSidebar data={serverShop} />
            </div>
          </div>

          <div className="w-full lg:ltr:pl-7 lg:rtl:pr-7">
            <p> Dihan Abir </p>
            {/* <AllProductFeed data={serverShop} /> */}
          </div>
        </Element>
      </Container>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayShop}
        onClose={closeShop}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        {/* <ShopSidebarDrawer data={serverShop} /> */}
      </Drawer>
    </>
  );
};

export default ShopsSingleDetails;
