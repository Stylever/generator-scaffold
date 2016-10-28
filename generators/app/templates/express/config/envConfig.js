var envConfig = {
	development: {
		port: process.env.PORT || 2333,
		staticBaseUrl: '/',
		staticPath: '/public/dev/'
	},
	production: {
		port: process.env.PORT || 2333,
		staticBaseUrl: '/',
		staticPath: '/public/dist/'
	}
};

module.exports = envConfig;