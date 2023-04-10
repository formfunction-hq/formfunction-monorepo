import { NextFunction, Request, Response } from "express";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";
import { PublicKey } from "@solana/web3.js";
import getFirestoreConfigLinesCollection from "src/utils/firebase/firestore/getFirestoreConfigLinesCollection";
import FirestoreConfigLineWithoutRarityInfoDoc from "src/types/generative-mints/rarity/FirestoreConfigLineWithoutRarityInfoDoc";
import rankAttributesByMoonrankRarity from "src/utils/generative-mints/rarity/rankAttributesByMoonrankRarity";
import pLimit from "p-limit";
import invariant from "tiny-invariant";
import getFirestoreConfigLineDocRef from "src/utils/firebase/firestore/getFirestoreConfigLineDoc";

const limit = pLimit(10);

interface Body {
  candyMachineAddress: string;
}

/**
 * Reads Candy Machine info from Firestore, calculates rarity info, and writes modified info back
 * to Firestore.
 *
 * NOTE: this endpoint expects all the Candy Machine info (i.e. the config lines) to have
 * been uploaded already via writeCandyMachineInfoToFirestoreEndpoint.
 * If not all config lines have been uploaded, this endpoint will throw an error.
 */
export default async function writeCandyMachineInfoWithRarityToFirestoreEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { candyMachineAddress }: Body = req.body;
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

  const collectionRef = getFirestoreConfigLinesCollection(candyMachineAddress);
  const collection = await collectionRef.get();
  const allDocData: Array<FirestoreConfigLineWithoutRarityInfoDoc> = [];
  collection.forEach((doc) => {
    allDocData.push(doc.data() as any);
  });

  const itemsAvailable = candyMachineInfo.data.itemsAvailable.toNumber();
  invariant(
    itemsAvailable === allDocData.length,
    `Expected items available (${itemsAvailable}) to ` +
      `equal number of config lines stored in Firestore (${allDocData.length})`
  );

  const offchainMetadataInfoWithRarity =
    rankAttributesByMoonrankRarity(allDocData);

  await Promise.all(
    offchainMetadataInfoWithRarity.map((infoWithRarity) =>
      limit(async () => {
        const docRef = getFirestoreConfigLineDocRef(
          candyMachineAddress,
          infoWithRarity.index
        );
        await docRef.set(infoWithRarity);
      })
    )
  );

  res.sendStatus(200);
}
