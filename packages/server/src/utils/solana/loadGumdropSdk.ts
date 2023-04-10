import * as anchor from "@project-serum/anchor";
import FormfnGumdropSdk from "@formfunction-hq/formfunction-gumdrop";
import { Connection } from "@solana/web3.js";
import Environment from "formfn-shared/dist/types/Environment";
import Network from "src/types/enums/Network";
import getEnvironment from "src/utils/getEnvironment";
import getRpcHostFromNetwork from "src/utils/solana/getRpcHostFromNetwork";
import getGumdropConfigAuthority from "src/utils/keypairs/getGumdropConfigAuthority";

export default function loadGumdropSdk() {
  const authorityKeypair = getGumdropConfigAuthority();

  const wallet = new anchor.Wallet(authorityKeypair);

  const env = getEnvironment();
  const environment = env === Environment.Local ? Environment.Development : env;
  const rpc = getRpcHostFromNetwork(process.env.SOLANA_NETWORK as Network);
  const connection = new Connection(rpc);

  return new FormfnGumdropSdk({ connection, environment, wallet });
}
