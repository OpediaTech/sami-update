import Link from '@components/ui/link';
import { FaChevronDown } from 'react-icons/fa';
import ListMenu from '@components/ui/list-menu';
import ListCat from '@components/ui/list-cat';
import { useTranslation } from 'next-i18next';

import cn from 'classnames';
import { useEffect, Fragment, useRef, useState } from 'react';
import DropDownC from './DropDownC';
const zipcodes = require('zipcodes');

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation('menu');
  const cat = {
    id: 2,
    path: '/search',
    label: 'menu-categories',
    subMenu: [
      {
        id: 1,
        path: '/search',
        label: 'menu-fresh-vegetables',
      },
      {
        id: 2,
        path: '/search',
        label: 'menu-diet-nutrition',
      },
      {
        id: 3,
        path: '/search',
        label: 'menu-healthy-foods',
      },
      {
        id: 4,
        path: '/search',
        label: 'menu-grocery-items',
      },
      {
        id: 5,
        path: '/search',
        label: 'menu-beaf-steak',
      },
    ],
  };

  const [loading, setLoading] = useState(true);

  const [serverCategory, setServerCategory] = useState([]);

  useEffect(() => {
    // console.log('Start from here');
    getUser();
  }, [serverCategory]);

  async function getUser() {
    try {
      const response = await fetch(
        `https://sami-project.herokuapp.com/api/products/allcategory`,
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
      // console.log("result for category:",result )
      setServerCategory(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // console.log('All Datas come from server:', serverCategory);

  return (
    <nav
      className={cn(
        'headerMenu flex w-full relative -mx-3 xl:-mx-4',
        className
      )}
    >
      {/* {loading && 'Loading'} */}
      {/* {
        <div className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4">
          <Link
            href="/"
            className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
          >
            Categories
            <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-dark opacity-40 group-hover:text-brand">
              <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
            </span>
          </Link>

          <div className="absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0 w-[220px] xl:w-[240px] group-hover:opacity-100">
            <ul className="py-5 text-sm text-brand-muted">
              {serverCategory?.map((menu: any, index: number) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${index}`;
                return (
                  <ListCat
                    dept={dept}
                    data={menu}
                    hasSubMenu={menu.subMenu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      } */}

      <div className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4">
        <DropDownC data={serverCategory} />
      </div>

      {data?.map((item: any) => (
        <div
          className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4"
          key={item.id}
        >
          <Link
            href={item.path}
            className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
          >
            {t(item.label)}
            {(item?.columns || item.subMenu) && (
              <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-dark opacity-40 group-hover:text-brand">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {item?.subMenu && Array.isArray(item?.subMenu) && (
            <div className="absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0 w-[220px] xl:w-[240px] group-hover:opacity-100">
              <ul className="py-5 text-sm text-brand-muted">
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   // const res = await fetch('https://jsonplaceholder.typicode.com/todos');
//   const res = await fetch('http://localhost:5000/api/products/allcategory');
//   const posts = await res.json();

//   console.log('static posts:', posts);
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   };
// }

export default HeaderMenu;
