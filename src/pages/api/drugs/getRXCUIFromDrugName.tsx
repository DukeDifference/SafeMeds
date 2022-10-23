import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getRXCUIFromDrugName = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name } = JSON.parse(req.body);
  const ENDPOINT = "https://rxnav.nlm.nih.gov/REST/rxcui.json";
  const resp = (await axios.get(`${ENDPOINT}?name=${name}&search=2`)).data;

  if (Object.keys(resp.idGroup).length !== 0) {
    res.send({
      success: true,
      data: resp.idGroup.rxnormId[0],
    });
  }
  res.send({
    success: false,
    data: 0,
  });
};

export default getRXCUIFromDrugName;
