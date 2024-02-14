export function onRequest(context) {
  console.log(context);
  console.log('function called')
  return new Response("Hello, world! x 2")
}