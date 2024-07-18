import type { CartFavContextType } from "contexts/CartFavContext";
import type { WarningContextType } from "contexts/WarningContext";

export function AddToCart(
  id: number,
  section: Sections,
  price: number,
  cartFavContextData?: CartFavContextType,
  warningContextData?: WarningContextType
) {
  const foundItem = cartFavContextData?.cartList[0].find(
    (item) => item.id === id && item.section === section
  );
  if (!foundItem) {
    if (Array.isArray(cartFavContextData?.cartList[0])) {
      const newWarning = {
        id: warningContextData?.warningList[0].length
          ? warningContextData.warningList[0][
              warningContextData?.warningList[0].length - 1
            ].id + 1
          : 0,
        text: "Товар добавлен в корзину",
        type: "warning" as const,
      };
      warningContextData?.warningList[1]((oldValue) => {
        const newArray = oldValue.map((item) => item);
        newArray.push(newWarning);
        return newArray;
      });
      cartFavContextData?.cartList[1]((oldValue) => [
        ...oldValue,
        {
          id: id,
          section: section,
          quantity: 1,
          price: price,
        },
      ]);
    }
    return;
  }

  cartFavContextData?.cartList[1]((oldValue) =>
    oldValue.filter((item) => item.id !== id)
  );
}
