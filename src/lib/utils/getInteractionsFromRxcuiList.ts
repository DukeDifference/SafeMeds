import axios from "axios";

const getInteractionsFromRxcuiList = async (rxcuiList: Array<number>) => {
  const listname = rxcuiList.join("+");
  const ENDPOINT = "https://rxnav.nlm.nih.gov/REST/interaction/list.json";
  const resp = await axios.get(`${ENDPOINT}?rxcuis=${listname}`);
  return resp.data.fullInteractionTypeGroup;
};
export default getInteractionsFromRxcuiList;
