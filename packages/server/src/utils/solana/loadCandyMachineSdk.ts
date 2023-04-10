import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getEnvironment from "src/utils/getEnvironment";
import FormfnCandyMachineSdk from "@formfunction-hq/formfunction-candy-machine";
import getConnection from "src/utils/solana/getConnection";
import * as anchor from "@project-serum/anchor";

export default function loadCandyMachineSdk() {
  const connection = getConnection();
  const authorityKeypair = getAuthorityKeypair();
  const environment = getEnvironment();
  const wallet = new anchor.Wallet(authorityKeypair);

  return new FormfnCandyMachineSdk({ connection, environment, wallet });
}
