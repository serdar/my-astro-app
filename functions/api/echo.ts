export const onRequest = async (context) => {
	const value = "howdy:" + new Date().toString();
 	return new Response(value);
}