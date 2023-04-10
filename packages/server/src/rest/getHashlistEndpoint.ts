/* eslint-disable typescript-sort-keys/string-enum */
import { NextFunction, Request, Response } from "express";
import getUserFromRequestHeaders from "src/utils/auth/getUserFromRequestHeaders";
import { Parser } from "json2csv";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftStatusExpress_Enum } from "src/__generated__/generated";

enum Column {
  mint = "Mint",
  nftName = "NFT Name",
  creatorId = "Creator ID",
  ownerId = "Owner ID",
  seriesId = "Series ID",
  seriesName = "Series Name",
  editionNumber = "Edition Number",
}

const COLUMNS = Object.values(Column);

type Row = {
  [Column.mint]: string;
  [Column.nftName]: string;
  [Column.creatorId]: string;
  [Column.ownerId]: string;
  [Column.seriesId]: string;
  [Column.seriesName]: string;
  [Column.editionNumber]: string;
};

export default async function getHashlistEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const user = await getUserFromRequestHeaders(req);
  if (user == null) {
    throw new Error("Invalid request.");
  }
  const nfts = await getPrisma().nft.findMany({
    include: { NftMetadata: true, Series: true },
    where: {
      creatorId: user.id,
      status: { not: NftStatusExpress_Enum.Burned },
    },
  });
  const rows: Array<Row> = nfts.map((nft) => ({
    [Column.mint]: nft.mint!,
    [Column.nftName]: nft.NftMetadata.name,
    [Column.creatorId]: nft.creatorId,
    [Column.ownerId]: nft.ownerId,
    [Column.seriesId]: nft.seriesId ?? "",
    [Column.seriesName]: nft.Series?.name ?? "",
    [Column.editionNumber]: nft.edition != null ? String(nft.edition) : "",
  }));
  const parser = new Parser({ fields: COLUMNS });
  const csvData = parser.parse(rows);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${user.id}_hashlist.csv`
  );

  res.status(200).end(csvData);
}
