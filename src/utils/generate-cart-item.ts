import isEmpty from 'lodash/isEmpty';
interface Item {
  id: string | number | any;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}
interface Variation {
  id: string | number | any;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: any, variation: Variation) {
  const { _id, name, slug, image, price, sale_price, quantity, unit } = item;
  // console.log(item._id);
  if (!isEmpty(variation)) {
    return {
      id: _id,
      productId: _id,
      name: `${name} - ${variation.title}`,
      slug,
      unit,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: image[0],
      variationId: variation.id,
    };
  }
  return {
    id: _id,
    name,
    slug,
    unit,
    image: image[0],
    stock: quantity,
    price: sale_price ? sale_price : price,
  };
}
