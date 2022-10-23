import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getDrugEnforcementRecalls = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const ENDPOINT =
    "https://api.fda.gov/drug/enforcement.json?search=report_date";
  const TODAYS_DATE = new Date();
  const TWO_WEEKS_AGO = new Date();

  const DAYS_OFFSET = 24 * 60 * 60 * 1000 * 14; // fourteen days ago

  TWO_WEEKS_AGO.setTime(TODAYS_DATE.getTime() - DAYS_OFFSET);

  const resp = await axios.get(
    `${ENDPOINT}:[${TWO_WEEKS_AGO.toISOString()
      .split("T")[0]
      .replaceAll("-", "")}+TO+${TODAYS_DATE.toISOString()
      .split("T")[0]
      .replaceAll("-", "")}]&limit=10`
  );

  if (resp.status === 200) {
    res.send({ success: false, data: resp });
  } else {
    res.send({ success: false, data: {} });
  }
};

export default getDrugEnforcementRecalls;
