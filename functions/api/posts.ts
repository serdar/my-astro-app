import { getPosts } from "../../database/index";

export const onRequest = async (context) => {
   const value = "posts api";
   const message = getPosts();
   console.log(`post:message:`, message);
   return new Response(value);
};
