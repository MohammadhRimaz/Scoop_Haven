import Bin from "../Icons/Bin";
import Image from "next/image";
import { cartProductPrice } from "../AppContext";

export default function CartProduct({ product, onRemove, index }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image src={product.image} alt={""} width={200} height={200} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.count && (
          <div className="text-sm">
            Count: <span>{product.count.name}</span>
          </div>
        )}
        {product.flavour?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.flavours.map((flavour) => (
              <div>
                {flavour.name} + Rs. {flavour.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">
        Rs. {cartProductPrice(product)}
      </div>
      {onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Bin />
          </button>
        </div>
      )}
    </div>
  );
}
