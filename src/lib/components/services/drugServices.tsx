import axios from "axios";

const getRXCUIFromDrugName = async (name: string) => {
  const ENDPOINT = "https://rxnav.nlm.nih.gov/REST/rxcui.json";
  const resp = await axios.get(`${ENDPOINT}?name=${name}&search=2`);
  return resp.data.idGroup.rxnormId[0];
};

const getInteractionsFromRXCUI = (rxcui: string) => {
  const ENDPOINT =
    "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json";
  return axios.get(`${ENDPOINT}?rxcui=${rxcui}`);
};

const getInteractionsFromDrugName = async (name: string) => {
  const rxcui = await getRXCUIFromDrugName(name);
  return (await getInteractionsFromRXCUI(rxcui)).data.interactionTypeGroup[0]
    .interactionType[0].interactionPair;
};

const getInteractionsFromRXCUIList = async (RXCUIList: Array<number>) => {
  const listname = RXCUIList.join("+");
  const ENDPOINT = "https://rxnav.nlm.nih.gov/REST/interaction/list.json";
  const resp = await axios.get(`${ENDPOINT}?rxcuis=${listname}`);
  return resp.data.fullInteractionTypeGroup;
};

const drugServices = {
  getRXCUIFromDrugName,
  getInteractionsFromRXCUI,
  getInteractionsFromDrugName,
  getInteractionsFromRXCUIList,
};

export default drugServices;
