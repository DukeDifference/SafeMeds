import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { Client } from "pg";

const postUserDrug = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getSession({ req });
  // const { drug_id } = JSON.parse(req.body);
  // if (session && session.user) {
  //   const { email } = session.user;
  //   res.send({ status: true });
  // } else {
  //   res.send({ status: false });
  //
  // }
  res.send(req.body);
};

export default postUserDrug;
