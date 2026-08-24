import { expect } from "chai";

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

describe("environment checker", function () {
  it("accepts a normal configuration", function () {
    const result = checkEnvironment({
      chainId: 1924,
      rpcUrl: "https://rpc.example.com",
      contractAddress:
        "0x1234567890123456789012345678901234567890",
    });

    expect(result).to.have.length(0);
  });

  it("rejects an empty RPC URL", function () {
    const result = checkEnvironment({
      chainId: 1924,
      rpcUrl: "",
      contractAddress:
        "0x1234567890123456789012345678901234567890",
    });

    expect(result).to.include(
      "invalid rpc url",
    );
  });

  it("rejects an invalid address", function () {
    const result = checkEnvironment({
      chainId: 1924,
      rpcUrl: "https://rpc.example.com",
      contractAddress: "hello",
    });

    expect(result).to.include(
      "invalid contract address",
    );
  });

  it("rejects an invalid chain id", function () {
    const result = checkEnvironment({
      chainId: 0,
      rpcUrl: "https://rpc.example.com",
      contractAddress:
        "0x1234567890123456789012345678901234567890",
    });

    expect(result).to.include(
      "invalid chain id",
    );
  });

  it("can report multiple problems", function () {
    const result = checkEnvironment({
      chainId: 0,
      rpcUrl: "",
      contractAddress: "bad",
    });

    expect(result.length).to.equal(3);
  });
});
