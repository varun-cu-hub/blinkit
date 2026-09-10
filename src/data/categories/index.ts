import { Product } from '../../types';
import { GROCERY_STAPLES_PRODUCTS } from './groceryStaples';
import { SNACKS_BEVERAGES_PRODUCTS } from './snacksBeverages';
import { PERSONAL_CARE_PRODUCTS } from './personalCare';
import { HOME_LIFESTYLE_PRODUCTS } from './homeLifestyle';

export {
  GROCERY_STAPLES_PRODUCTS,
  SNACKS_BEVERAGES_PRODUCTS,
  PERSONAL_CARE_PRODUCTS,
  HOME_LIFESTYLE_PRODUCTS
};

export const ALL_CATEGORY_PRODUCTS: Product[] = [
  ...GROCERY_STAPLES_PRODUCTS,
  ...SNACKS_BEVERAGES_PRODUCTS,
  ...PERSONAL_CARE_PRODUCTS,
  ...HOME_LIFESTYLE_PRODUCTS
];
