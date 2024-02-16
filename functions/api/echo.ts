export function onRequest(context:any) {
  console.log(context);
  console.log('function called')
  return new Response(new Date().toString())
}