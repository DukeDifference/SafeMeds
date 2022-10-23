import getInteractionsFromRxcui from "./getInteractionsFromRxcui";
import getRxcuiFromDrugName from "./getRxcuiFromDrugName";

const getInteractionsFromDrugName = async (name: string) => {
  const rxcui = await getRxcuiFromDrugName(name);

  if (rxcui.success) {
    return getInteractionsFromRxcui(rxcui.data);
  }

  return rxcui;
};
export default getInteractionsFromDrugName;
