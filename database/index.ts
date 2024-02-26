import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";

const client = new Client({});

const db = drizzle(client);

export const getPosts = async () => {
   return "hi";
};
