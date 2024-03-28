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
   },
   {
      id: 2,
      title: "My 2 Post",
      description: "ngl, I want to get my hands on a Fujifilm X-series, having separate dials for aperture, shutter speed, and ISO resonates with me.",
      pubDate: new Date(),
      published: true,
      slug: "my-2-post",
      siteVersionNumber: 1
   }])
}