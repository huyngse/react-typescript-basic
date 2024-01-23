import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { memo } from "react";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType) => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  const onAddToCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, quantity: 1 },
    });
  };

  const itemInCart: string = inCart ? "→ Item in Cart: 🗸" : "";

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
        <button onClick={onAddToCart}>Add to Cart</button>
      </p>
    </article>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
