import { db, Comments } from "astro:db";

export default async function seed() {
   await db.insert(Comments).values([{
      id: 1,
      title: "My First Post",
      description: "Blog post The coffee industry needs it's equivalent of the W3C to stop this mess:",
      pubDate: new Date(),
      published: true,
      slug: "my-first-post",
      siteVersionNumber: 1
   }])
}