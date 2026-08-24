type Environment = {
  chainId: number;
  rpcUrl: string;
  contractAddress: string;
};

function isAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

function checkEnvironment(
  environment: Environment,
): string[] {
  const errors: string[] = [];

  if (environment.chainId <= 0) {
    errors.push("invalid chain id");
  }

  if (!environment.rpcUrl.startsWith("http")) {
    errors.push("invalid rpc url");
  }

  if (!isAddress(environment.contractAddress)) {
    errors.push("invalid contract address");
  }

  return errors;
}

const environment: Environment = {
  chainId: Number(
    process.env.RITUAL_CHAIN_ID ?? 0,
  ),
  rpcUrl:
    process.env.RITUAL_RPC_URL ?? "",
  contractAddress:
    process.env.MARKET_ADDRESS ?? "",
};

const errors =
  checkEnvironment(environment);

if (errors.length === 0) {
  console.log(
    "Environment looks OK.",
  );
} else {
  console.log(
    "Environment check failed:",
  );

  for (const error of errors) {
    console.log(`- ${error}`);
  }
}
