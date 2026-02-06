import { useNavigate } from "react-router-dom";
import type { IProduct } from "../interfaces/product";
import { useStore } from "../store/globalState";
import { RequestStatus } from "../constants";

export const ProductItem: React.FC<{ product: IProduct }> = ({ product }) => {
  const { setProduct } = useStore();
  const navigate = useNavigate();
  const img = product.img ?? "logo.webp";

  const handlerClick = () => {
    setProduct({
      status: RequestStatus.LOADED,
      data: product,
    });
    navigate(`/products/${product._id}`);
  };

  return (
    <section className="product-item" onClick={handlerClick}>
      <img src={img} alt={`${product.name.SPANISH}`} />
      <section className="product-item-info">
        <p className="name">{product.name.SPANISH}</p>
        <p>
          <b>Código: </b> {product.code}
        </p>
        <p>
          <b>Area: </b> {product.area}
        </p>
        <p>
          <b>Sección: </b> {product.section}
        </p>
        <p>
          <b>Horario: </b> {product.schedule}
        </p>
        <p>
          <b>Precio en caliente: </b> {product.hotPrice}
        </p>
      </section>
    </section>
  );
};
