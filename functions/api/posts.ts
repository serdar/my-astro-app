import { getPosts } from "../../database/index";

export const onRequest = async (context) => {
   const value = "posts api";
   const message = await getPosts(context.env.DATABASE_URL);
   console.log(JSON.stringify(message));
   return new Response(JSON.stringify(message));
   // console.log(`post:message:`, message);
   // console.log(`post:ENV:`, context.env.DATABASE_URL);
   // const r = message;
   // return new Response(JSON.stringify(r));
};
