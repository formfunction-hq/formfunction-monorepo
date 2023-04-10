// Need to import this way in order to spy on the module
// https://stackoverflow.com/a/54245672
import * as getPrisma from "src/utils/prisma/getPrisma";
import * as getConnection from "src/utils/solana/getConnection";
import * as getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import { Keypair } from "@solana/web3.js";

function mockPrisma() {
  const spy = jest.spyOn(getPrisma, "default");
  spy.mockImplementation(() => {
    throw new Error(
      "DB access is prohibited during tests. Please mock the code path that accesses the DB before trying again."
    );
  });
}

function mockSolanaRpcConnection() {
  const spy = jest.spyOn(getConnection, "default");
  spy.mockImplementation(() => {
    throw new Error(
      "Blockchain access is prohibited during tests. Please mock the code path that uses an RPC connection before trying again."
    );
  });
}

function mockGetAuthorityKeypair() {
  const spy = jest.spyOn(getAuthorityKeypair, "default");
  spy.mockReturnValue(Keypair.generate());
}

beforeAll(() => {
  mockPrisma();
  mockSolanaRpcConnection();
  mockGetAuthorityKeypair();
});
