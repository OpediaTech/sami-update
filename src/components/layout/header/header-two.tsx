import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import HeaderMenu from '@components/layout/header/header-menu';
import LanguageSwitcher from '@components/ui/language-switcher';
import { useModalAction } from '@components/common/modal/modal.context';
import cn from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { useEffect, Fragment, useRef, useState } from 'react';
import { MdLocationOn } from 'react-icons/md';

const zipcodes = require('zipcodes');
import Search from '@components/common/search';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { openSidebar, isAuthorized, displayMobileSearch } = useUI();

  const [open, setOpen] = useState(false);
  const [zipCode, setZipCode] = useState(null);
  const [zipCodeResult, setZipCodeResult] = useState(true);
  const [zipCodeResultare, setZipCodeResultare] = useState('');

  const cancelButtonRef = useRef(null);

  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  const areasearch = () => {
    var hills = zipcodes.lookup(zipCode);
    console.log(hills);
    setZipCodeResultare(hills?.city);
    // hills !== undefined && setZipCodeResultare(hills?.city);;
    hills === undefined && setZipCodeResult(false);
    hills === undefined && setZipCode(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const a: any = localStorage.getItem('zipCode');
      setZipCode(a);
    }

    const isZipped = localStorage.getItem('zip');
    // console.log(isZipped);
    {
      isZipped !== 'true' &&
        setTimeout(() => {
          setOpen(true);
          localStorage.setItem('zip', 'true');
        }, 2000);
    }
  }, []);

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-one w-full h-16 lg:h-20 z-30 sticky top-0',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="z-20 w-full h-16 transition duration-200 ease-in-out innerSticky body-font bg-brand-light lg:h-20">
        <Search className="top-bar-search lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1" />
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between w-full h-full">
          <div className="flex shrink-0">
            <button
              aria-label="Menu"
              className="flex-col items-center justify-center hidden outline-none menuBtn ltr:mr-5 rtl:ml-5 lg:flex xl:hidden shrink-0 focus:outline-none"
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </button>

            <Logo className="-mt-1" />
          </div>

          <HeaderMenu
            data={site_header.menu}
            className="hidden xl:flex md:ltr:pl-6 md:rtl:pr-6 xl:ltr:pl-10 xl:rtl:pr-10"
          />
          <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
            {/* zip Code  */}
            <div
              onClick={() => setOpen(true)}
              className="areawesearve relative py-3 mx-3 cursor-pointer  group xl:mx-4"
            >
              <p className="aretext relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto">
                {zipCode ? (
                  <div className="d-flex">
                    <MdLocationOn fontSize={20} color="#666" /> {zipCode}
                  </div>
                ) : (
                  ' Area we Delivered'
                )}
              </p>
            </div>

            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="locationtxtxtx  ">
                              {/* <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                              <p>Locations</p>
                              <MdLocationOn />
                              {/* <MdLocationOn className="lcoationmtmt" /> */}
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <Dialog.Title
                                as="h3"
                                className="text-lg leading-6 font-medium text-gray-900"
                              >
                                Search your area by ZIP code
                              </Dialog.Title>
                              {/* {zipCodeResult ? <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Search your area by ZIP code
                        </Dialog.Title>: <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Sorry we are not starting to delivery on {zipCodeResultare.city}
                      </Dialog.Title>} */}

                              <div className="mt-2">
                                <input
                                  placeholder="zip code"
                                  type="number"
                                  onChange={(e: any) => {
                                    setZipCode(e.target.value);
                                    localStorage.setItem(
                                      'zipCode',
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                              {zipCodeResultare && (
                                <Dialog.Title
                                  as="h3"
                                  className="delirvrtyTxt text-lg leading-6 font-medium text-gray-900"
                                >
                                  We are delivery at: {zipCodeResultare}
                                </Dialog.Title>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            className="btnZipColor mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            // onClick={() => setOpen(false)}
                            onClick={() => areasearch()}
                          >
                            search
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
            {/* zip Code  */}

            <div className="xl:mx-3.5 py-3  mx-2.5">
              <LanguageSwitcher />
            </div>
            <CartButton className="hidden lg:flex xl:mx-3.5 mx-2.5" />
            <div className="items-center hidden lg:flex shrink-0 xl:mx-3.5 mx-2.5">
              <UserIcon className="text-brand-dark text-opacity-40" />
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                btnProps={{
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
