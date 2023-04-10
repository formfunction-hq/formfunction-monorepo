import { NextFunction, Request, Response } from "express";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";
import { PublicKey } from "@solana/web3.js";
import writeCandyMachineInfoToFirestore from "src/utils/generative-mints/rarity/writeCandyMachineInfoToFirestore";

interface Body {
  candyMachineAddress: string;
  offchainMetadataUris: Array<{ index: number; uri: string }>;
}

export default async function writeCandyMachineInfoToFirestoreEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { candyMachineAddress, offchainMetadataUris }: Body = req.body;
  const candyMachineSdk = loadCandyMachineSdk();
  const candyMachineKey = new PublicKey(candyMachineAddress);
  const candyMachineInfo = await candyMachineSdk.fetchCandyMachine(
    candyMachineKey
  );
  if (candyMachineInfo == null) {
    res.status(400).send({
      candyMachineInfo,
      message: "Candy machine info could not be loaded from blockchain",
    });
    return;
  }

  await writeCandyMachineInfoToFirestore(
    candyMachineAddress,
    offchainMetadataUris
  );

  res.sendStatus(200);
}
