import { getPosts } from "../../database/index";

export const onRequest = async (context) => {
   const message = await getPosts(context.env.DATABASE_URL);
   const {rows} = message
   console.log(JSON.stringify(message));

   return new Response(JSON.stringify(rows));
};
