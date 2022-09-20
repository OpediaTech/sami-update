import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useSignUpMutation, SignUpInputType } from '@framework/auth/use-signup';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import Cookies from 'js-cookie';
import { useUI } from '@contexts/ui.context';

interface SignUpFormProps {
  isPopup?: boolean;
  className?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation();
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { authorize } = useUI();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  function onSubmit({ name, email, password, remember_me }: SignUpInputType) {
    signUp({
      name,
      email,
      password,
      remember_me,
    });
    console.log(name, email, password, 'sign form values');
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  };

  const loginghandler = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`https://sami-project.herokuapp.com/api/users`, requestOptions).then(
        (response) => {
          response.json().then((data) => {
            console.log(response.status);
            console.log(data);

            if (data.message === 'User already exists') {
              return alert('User is already exist!');
            }
            if (response.status === 200) {
              alert('Congratulation, You are member now');
              // return closeModal();
              openModal('LOGIN_VIEW');
            }
            if (response.status < 400) {
              alert('Congratulation, You are member now');
              openModal('LOGIN_VIEW');
            }

            // response.status === 200 && Cookies.set('auth_token', data.token);
            // response.status === 200 && authorize();
            // response.status === 200 && closeModal();
            // response.status === 200 &&
            //   alert('Congratulation, You are member now');

            // response.status < 400 && alert('Please Provide valid information');
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
    // closeModal();
  };
  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/registration.png"
            alt="sign up"
            layout="fill"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-sign-up-for-free')}
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-base text-body">
              {t('common:text-already-registered')}
              <button
                type="button"
                className="text-sm font-semibold ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
                onClick={handleSignIn}
              >
                {t('common:text-sign-in-now')}
              </button>
            </div>
          </div>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={(e) => loginghandler(e)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <label
                className={`block font-normal text-sm leading-none mb-3 cursor-pointer 
                  `}
              >
                Name
              </label>
              <input onChange={(e) => setName(e.target.value)} type="text" />
              <label
                className={`block font-normal text-sm leading-none mb-3 cursor-pointer 
                  `}
              >
                Email
              </label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" />
              <label
                className={`block font-normal text-sm leading-none mb-3 cursor-pointer 
                  `}
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />

              {/* <Input
                label={t('forms:label-name')}
                type="text"
                variant="solid"
                {...register('name', {
                  required: 'forms:name-required',
                })}
                error={errors.name?.message}
              />
              <Input
                label={t('forms:label-email')}
                type="email"
                variant="solid"
                {...register('email', {
                  required: `${t('forms:email-required')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('forms:email-error'),
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label={t('forms:label-password')}
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
              /> */}
              <div className="flex items-center justify-center">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>

                  <label
                    htmlFor="remember"
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div>
                <div
                  className="flex ltr:ml-auto rtl:mr-auto mt-[2px]"
                  onClick={closeModal}
                >
                  <Link
                    href={ROUTES.PRIVACY}
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    {t('common:text-privacy-and-policy')}
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-register')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
