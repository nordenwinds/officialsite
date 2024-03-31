export type Environment = 'local' | 'dev' | 'prd';

export type Config = {
  name: string;
  baseUrl: string;
  cors: {
    origins: string[];
  };
};
