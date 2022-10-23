// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import generateRandomUsers from "../../lib/utils/generateRandomUsers";

const db = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();

  await client.query("DROP TABLE public.user_drugs;");
  await client.query("DROP TABLE public.users;");
  await client.query("DROP TABLE public.drugs;");
  await client.query("CREATE TYPE IF NOT EXISTS sex AS ENUM ('M', 'F', 'O')");

  await client.query(`
  CREATE TABLE IF NOT EXISTS public.users (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    sex SEX NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    email VARCHAR(256) UNIQUE NOT NULL,
    consumes_alcohol BOOL NOT NULL,
    consumes_nicotine BOOL NOT NULL,
    consumes_caffeine BOOL NOT NULL,
    is_pregnant BOOL NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id ASC)
  )
  `);

  await client.query(`
  CREATE TABLE IF NOT EXISTS public.drugs (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT drugs_pkey PRIMARY KEY (id ASC)
  )
  `);

  await client.query(`
  CREATE TABLE IF NOT EXISTS public.user_drugs (
    user_id UUID NOT NULL,
    drug_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    rowid INT8 NOT VISIBLE NOT NULL DEFAULT unique_rowid(),
    CONSTRAINT user_drugs_pkey PRIMARY KEY (rowid ASC),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT fk_drugs FOREIGN KEY (drug_id) REFERENCES public.drugs(id)
  )
  `);

  try {
    const users = await generateRandomUsers(client);
    res.statusCode = 200;
    res.json({ date: users });
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  } finally {
    client.end();
  }
};

export default db;
