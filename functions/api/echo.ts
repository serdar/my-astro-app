export const onRequest = async (context) => {
	const value = "howdy";
 	return new Response(value);
}