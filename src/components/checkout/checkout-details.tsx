import { useState } from 'react';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import Contact from '@components/contact/contact';
import Address from './address';
import DeliveryNotes from './delivery-instruction';
import DeliverySchedule from './schedule';
import DeliveryTips from './delivery-tips';
import StripeCheckoutInlineForm from './stripe-checkout-inline-form';
import { useTranslation } from 'next-i18next';
import StripeCheckout from 'react-stripe-checkout';
import { useRouter } from 'next/router';

const CheckoutDetails: React.FC<{ priceCart: any }> = ({ priceCart }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [bindIndex, setBindIndex] = useState(0);
  const changeItem = (itemIndex: any) => {
    if (itemIndex !== bindIndex) {
      setBindIndex(itemIndex);
    }
  };
  let priceCart1: any = priceCart * 100;

  console.log('priceCart', priceCart);

  const product = {
    name: 'Stripe course',
    price: Math.round(priceCart1.toFixed(2)),
    productby: 'facebook',
    image:
      'https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  };

  interface tokeninterface {
    token: any;
  }

  const StripePaymentHandler = () => {
    localStorage.removeItem('borobazar-cart');
    console.log('token checkout');
    const data = {
      product,
    };

    // fetch(`http://localhost:5000/api/products/payment`, {
    fetch(`https://sami-project.herokuapp.com/api/products/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) return response.json();
        // const noData:any = ''
        // console.log("Removesd: ",localStorage.getItem("borobazar-cart") )
        // if(response.ok) return localStorage.setItem("borobazar-cart", noData) ;

        return response.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        console.log(url);
        window.location = url;
      })
      .catch((err) => console.log(err));
  };

  // const StripePaymentHandler = (token: any) => {
  //   console.log('token checkout', token);
  //   const data = {
  //     token,
  //     product,
  //   };

  //   fetch(`http://localhost:5000/api/products/payment`, {
  //   // fetch(`https://sami-project.herokuapp.com/api/products/payment`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       console.log('response', response);
  //       const { status } = response;
  //       console.log('STATUS', status);
  //       status === 200 && router.push('/');
  //     })
  //     .catch((err) => console.log(err));
  // };

  const data = [
    {
      id: 1,
      title: 'text-delivery-address',
      component: <Address />,
    },
    // {
    //   id: 2,
    //   title: 'text-delivery-schedule',
    //   component: <DeliverySchedule />,
    // },
    {
      id: 3,
      title: 'text-contact-number',
      component: <Contact />,
    },

    {
      id: 4,
      title: 'text-delivery-instructions',
      component: <DeliveryNotes />,
    },
    {
      id: 5,
      title: 'text-delivery-tip',
      component: <DeliveryTips />,
    },
    {
      id: 6,
      title: 'text-payment-option',
      component: (
        <button
          onClick={() => StripePaymentHandler()}
          className="bg-brand text-brand-light rounded font-semibold font-[14px] px-4 py-3"
        >
          Pay Now
        </button>

        // <StripeCheckout
        //   token={StripePaymentHandler}
        //   amount={product?.price * 100} // cents
        //   currency="USD"
        //   stripeKey="pk_test_51L2pj4JsstQNEHZrT6AstJs5e13371TDGxS6OlSuJC4ejTwQ9T6AU5A49jfD2BS0lWpIRHkWQjNd59mUl9HfNhJf001UghFhNn"
        //   name="Shami checkout"
        // >
        //   <button className="bg-brand text-brand-light rounded font-semibold font-[14px] px-4 py-3">
        //     Pay Now
        //   </button>
        // </StripeCheckout>
      ),
      // component: <StripeCheckoutInlineForm />,
    },
  ];

  return (
    <div className="border rounded-md border-border-base text-brand-light">
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`accordion__panel ${
              !(data?.length - 1 === index) ? 'border-b border-border-base' : ''
            } ${bindIndex !== index ? 'collapsed' : 'expanded'}
            `}
            onClick={() => changeItem(index)}
          >
            <div
              id={`index_${index}`}
              className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 accordion__button"
            >
              <span className="flex items-center justify-center font-semibold border-2 border-current rounded-full h-9 w-9 text-brand ltr:mr-3 rtl:ml-3">
                {index + 1}
              </span>
              <Heading>{t(item?.title)} </Heading>
            </div>

            <div
              data-aria-label={`index_${index}`}
              className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-9 sm:rtl:pr-9 lg:ltr:pl-20 lg:rtl:pr-20 sm:ltr:pr-9 sm:rtl:pl-9 ltr:pr-5 rtl:pl-5 accordion__content"
            >
              <div className="mb-6">{item?.component}</div>
              {!(data?.length - 1 === index) ? (
                <div className="ltr:text-right rtl:text-left">
                  <Button
                    onClick={() => changeItem(index + 1)}
                    variant="formButton"
                    className="bg-brand text-brand-light rounded font-semibold font-[14px] px-4 py-3"
                  >
                    {t('button-next-steps')}
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutDetails;

// function CheckoutStripe() {
//   return (
//     <div>checkout-details</div>
//   )
// }
