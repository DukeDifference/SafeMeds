import axios from "axios";

const getInteractionsFromRxcui = async (rxcui: string) => {
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
export default getInteractionsFromRxcui;
