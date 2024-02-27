export const onRequest = async (context) => {
	const value = "Server time is " + new Date().toString();
 	return new Response(value);
}