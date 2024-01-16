/**
 * Middleware to check if the user is authenticated
 * @param request
 * @constructors
 */
const AuthMiddleware = (request: Request, env: Env) => {
	const token = request.headers.get('Authorization');

	// Strict check for token existence
	if (!env.TOKEN || env.TOKEN.length === 0) {
		return new Response('You must set the TOKEN environment variable.', {
			status: 401,
		});
	}
	// Strick check for DKIM Values
	if (!env.DKIM_DOMAIN || env.DKIM_DOMAIN.length === 0) {
		return new Response('You must set the DKIM_DOMAIN environment variable, with the DKIM domain (example.com).', {
			status: 401,
		});
	}
	if (!env.DKIM_SELECTOR || env.DKIM_SELECTOR.length === 0) {
		return new Response(
			'You must set the 	DKIM_SELECTOR environment variable, this is the name you put on the DNS before _domainkey when creating the DKIM record (example mailchannels).',
			{
				status: 401,
			}
		);
	}
	if (!env.DKIM_PRIVATE_KEY || env.DKIM_PRIVATE_KEY.length === 0) {
		return new Response('You must set the DKIM_PRIVATE_KEY environment variable, with the private key.', {
			status: 401,
		});
	}

	if (token !== env.TOKEN) {
		return new Response('Unauthorized', { status: 401 });
	}
};

export default AuthMiddleware;
