import { db, Comments } from "astro:db";

export default async function seed() {
   await db.insert(Comments).values([{
      id: 1,
      title: "My First Post",
      description: "This is my first post",
      pubDate: new Date(),
      published: true,
      slug: "my-first-post",
      siteVersionNumber: 1
   },{
      id: 2,
      title: "My Second Post",
      description: "This is my 2 post",
      pubDate: new Date(),
      published: true,
      slug: "my-2-post",
      siteVersionNumber: 1
   }])
}