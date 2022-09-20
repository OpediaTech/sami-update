import Layout from '@components/layout/layout';
import CheckoutCard from '@components/checkout/checkout-card';
import Container from '@components/ui/container';
import CheckoutDetails from '@components/checkout/checkout-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [priceCart, setPriceCart] = useState(0);
  // const { products, setProducts } = useState({
  //   name: 'Stripe course',
  //   price: 100,
  //   productby: 'facebook',
  // });
  console.log('priceCart New After handler', priceCart);

  const product = {
    name: 'Stripe course',
    price: priceCart,
    productby: 'facebook',
  };

  interface tokeninterface {
    token: any;
  }

  const StripePaymentHandler = (token: tokeninterface) => {
    console.log('token checkout Dihan', token);
    console.log('priceCart New Dihan  ', priceCart);
    const data = {
      token,
      product,
    };

    fetch(`https://sami-project.herokuapp.com/api/products/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('response', response);
        const { status } = response;
        console.log('STATUS', status);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, [product]);

  return (
    <>
      <Seo
        title="Checkout"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="checkout"
      />
      <Container className="py-10 border-t 2xl:py-12 border-border-base checkout">
        <div className="flex flex-col mx-auto xl:max-w-screen-xl">
          <div className="flex flex-col flex-wrap grid-cols-1 gap-x-7 xl:gap-x-8 lg:grid lg:grid-cols-12">
            <div className="w-full col-start-1 col-end-9">
              <CheckoutDetails priceCart={priceCart} />
            </div>
            <div className="w-full col-start-9 col-end-13 mt-7 lg:mt-0">
              <CheckoutCard setPriceCart={setPriceCart} />
            </div>
          </div>
        </div>
      </Container>
      <Divider />
      {/* <StripeCheckout
        token={StripePaymentHandler}
        amount={product?.price * 100} // cents
        currency="USD"
        stripeKey="pk_test_51L2pj4JsstQNEHZrT6AstJs5e13371TDGxS6OlSuJC4ejTwQ9T6AU5A49jfD2BS0lWpIRHkWQjNd59mUl9HfNhJf001UghFhNn"
        name="Shami checkout"
      >
        <button className="bg-brand text-brand-light rounded font-semibold font-[14px] px-4 py-3">
          Pay Now
        </button>
      </StripeCheckout> */}
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
