import axios from "axios";

const ENDPOINT = "https://rxnav.nlm.nih.gov/REST/rxcui.json";

const getRxcuiFromDrugName = async (name: string) => {
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
export default getRxcuiFromDrugName;
