import { column, defineDb, defineTable } from 'astro:db'

const Comments = defineTable(
   {
      columns: {
         id: column.number({ primaryKey: true }),
         title: column.text(),
         description: column.text(),
         pubDate: column.date(),
         published: column.boolean({
            default: true
         }),
         slug: column.text(),
         siteVersionNumber: column.number()
      }
   }
);

export default defineDb({
   tables: {
      Comments
   }
})

