// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { Client } from "@planetscale/database";
import { connect } from "@planetscale/database";

// import * as schema from "../database/posts";

// import { eq, desc, Placeholder, and, sql } from "drizzle-orm";

// export const mySchema = mysqlSchema("my_schema")
// export const mySchemaUsers = mySchema.table("users", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
// });

// const connectDb = (dbConnectionString: string) => {
//    console.log("*** db called ***");
//    const client = new Client({
//       url: dbConnectionString,
//    });

//    const db = drizzle(client, { schema });

//    return db;
// };

export const getPosts = async (dburl: string) => {
   // const db = connectDb(dburl);

   // const objPosts = await db.query.posts.findMany({
   //    limit: 10,
   //    orderBy: [desc(schema.posts.pubDate)],
   // });

   // console.log(`objPo:`, objPosts);

   const config = {
      url: dburl,
      fetch: (url: any, init: any) => {
         delete (init as any)["cache"]; // Remove cache header
         return fetch(url, init);
      },
   };

   const conn = connect(config);

   let results;

   try {
      results = await conn.execute("select * from posts limit 1;");
   } catch (error) {
      console.log(`dberror:`, error);
   }

   console.log(`res:`, results);
   return results;
   // return "hello";
};

export const getPostBySlug = async (dburl: string, slug: string) => {
   const config = {
      url: dburl,
      fetch: (url: any, init: any) => {
         delete (init as any)["cache"]; // Remove cache header
         return fetch(url, init);
      },
   };

   const conn = connect(config);

   let results;

   try {
      results = await conn.execute("select * from posts where slug = ?;", slug);
   } catch (error) {
      console.log(`dberror:`, error);
   }

   console.log(`res:`, results);
   return results;
   // return "hello";
};