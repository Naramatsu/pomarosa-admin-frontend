import { useNavigate } from "react-router-dom";
import type { IProduct } from "../interfaces/product";
import { useStore } from "../store/globalState";
import { RequestStatus } from "../constants";
import { currencyFormatter } from "../utils";

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

  const isAvailableClassName = product.isAvailable ? "" : "inactive";

  const availablePrices = [
    { label: "Caliente", value: product.hotPrice },
    { label: "Frío", value: product.coldPrice },
    { label: "Personal", value: product.personal },
    { label: "Familiar", value: product.familiar },
  ].filter((price) => price.value);

  return (
    <section
      className={`product-item ${isAvailableClassName}`}
      onClick={handlerClick}
    >
      <div className="product-item-image-wrapper">
        <img src={img} alt={`${product.name.SPANISH}`} />
        {!product.isAvailable && (
          <div className="unavailable-badge">No disponible</div>
        )}
      </div>

      <section className="product-item-info">
        <h3 className="product-name">{product.name.SPANISH}</h3>

        {product.description?.SPANISH && (
          <p className="product-description">{product.description.SPANISH}</p>
        )}

        <div className="product-details">
          <div className="detail-row">
            <span className="detail-label">Código:</span>
            <span className="detail-value">{product.code}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Sección:</span>
            <span className="detail-value">{product.section}</span>
          </div>
        </div>

        {availablePrices.length > 0 && (
          <div className="prices-grid">
            {availablePrices.map((price) => (
              <div key={price.label} className="price-item">
                <span className="price-item-label">{price.label}</span>
                <span className="price-item-value">
                  {currencyFormatter.format(price.value as number)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="product-footer">
          <div className="area-badge">
            {product.area === "KITCHEN" ? "Cocina" : "Panadería"}
          </div>
        </div>
      </section>
    </section>
  );
};
