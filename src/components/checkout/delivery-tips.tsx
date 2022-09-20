import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import cn from 'classnames';
import Layout from '@components/layout/layout';
import { useTranslation } from 'next-i18next';

const deliveryTip = ['5', '10', '15', '20', '25'];

export default function DeliveryTips() {
  const { t } = useTranslation('common');
  const [deliveryTips, setDeliveryTips] = useState(deliveryTip[0]);

  return (
    <div>
      <div className=" mx-auto">
        <input
          style={{
            color: '#000',
            zIndex: '99999999',
            marginBottom: '10px',
            borderRadius: '4px',
            borderColor: '#e6e6e6',
          }}
          onChange={(e) => {
            setDeliveryTips(e.target.value);
          }}
          placeholder="Enter tips $"
          type="number"
        />

        <RadioGroup value={deliveryTips} onChange={setDeliveryTips}>
          <RadioGroup.Label className="sr-only">
            {t('text-delivery-tip')}
          </RadioGroup.Label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {deliveryTip.map((tips) => (
              <RadioGroup.Option
                key={tips}
                value={tips}
                className={({ active, checked }) =>
                  cn(
                    'relative rounded-lg px-5 py-4 cursor-pointer focus:outline-none',
                    checked ? 'bg-brand text-white' : 'bg-gray-100'
                  )
                }
              >
                {({ active, checked }) => (
                  <div className="text-center">
                    <RadioGroup.Label
                      as="p"
                      className={`text-base font-semibold  ${
                        checked ? 'text-brand-light' : 'text-brand-dark'
                      }`}
                    >
                      ${tips}
                    </RadioGroup.Label>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <p
          style={{
            color: '#d43a2f',
            margin: '10px 0px',
            fontWeight: '600',
            zIndex: '99999999',
          }}
        >
          All Tips Goes to Delivery man
        </p>
        {/* End of date schedule */}
      </div>
    </div>
  );
}

DeliveryTips.Layout = Layout;
