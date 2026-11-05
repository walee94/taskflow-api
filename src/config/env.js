
const PORT = Number(process.env.PORT ?? 3000);

if (
  !Number.isSafeInteger(PORT) ||
  PORT < 0 ||
  PORT > 65535
) {
  throw new Error("Invalid PORT configuration");
}

export const config = {
  port: PORT,
  nodeEnv: process.env.NODE_ENV ?? "development"
};
