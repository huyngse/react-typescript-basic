import { ReactElement, createContext, useState, useEffect } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

export type UseProductsContextType = {
  products: ProductType[];
};

// const initState: ProductType[] = [];

const initState: ProductType[] = [
  {
    sku: "item0001",
    name: "Widget",
    price: 9.99,
  },
  {
    sku: "item0002",
    name: "Premium Widget",
    price: 19.99,
  },
  {
    sku: "item0003",
    name: "Deluxe Widget",
    price: 29.99,
  },
];

const initContextState: UseProductsContextType = {
  products: [],
};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  // useEffect(() => {
  //   const fetchProducts = async (): Promise<ProductType[]> => {
  //     const data await fetch();
  //   }
  // }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
