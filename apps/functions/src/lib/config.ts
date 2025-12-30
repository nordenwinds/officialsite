export type Environment = "local" | "dev" | "prd";

export type Config = {
	name: string;
	baseUrl: string;
	cors: {
		origins: string[];
	};
	otel: {
		exporter: {
			url: string;
		};
		service: {
			name: string;
		};
	};
};
