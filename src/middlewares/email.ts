import iEmailSchema, { IEmail } from '../schema/email';

export type EmailRequest = Request & {
	email?: IEmail;
	env?: Env;
};

/**
 * Middleware to validate the request body against the email schema
 * @param request
 * @constructor
 */
const EmailSchemaMiddleware = async (request: EmailRequest, env: Env) => {
	const content = await request.json();
	const email = iEmailSchema.safeParse(content);
	if (email.success) {
		request.email = email.data;
		request.env = env;
		return;
	}

	return new Response('Bad Request', {
		status: 400,
	});
};

export default EmailSchemaMiddleware;
