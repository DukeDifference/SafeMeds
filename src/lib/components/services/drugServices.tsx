import axios from "axios";

const getRXCUIFromDrugName = async (name: string) => {
  const ENDPOINT = "https://rxnav.nlm.nih.gov/REST/rxcui.json";
  const resp = (await axios.get(`${ENDPOINT}?name=${name}&search=2`)).data;

  if (resp.idGroup.keys.length !== 0) {
    return {
      success: true,
      data: resp.idGroup.rxnormId[0],
    };
  }
  return {
    success: false,
  };
};

const getInteractionsFromRXCUI = async (rxcui: string) => {
  const ENDPOINT =
    "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json";
  const resp = (await axios.get(`${ENDPOINT}?rxcui=${rxcui}`)).data;

  if (resp.interactionTypeGroup !== null) {
    return {
      success: true,
      data: resp.interactionTypeGroup[0].interactionType[0].interactionPair,
    };
  }

  return {
    success: false,
  };
};

const getInteractionsFromDrugName = async (name: string) => {
  const rxcui = await getRXCUIFromDrugName(name);

  if (rxcui.success) {
    return getInteractionsFromRXCUI(rxcui.data);
  }

  return rxcui;
};

const drugServices = {
  getRXCUIFromDrugName,
  getInteractionsFromRXCUI,
  getInteractionsFromDrugName,
};

export default drugServices;
