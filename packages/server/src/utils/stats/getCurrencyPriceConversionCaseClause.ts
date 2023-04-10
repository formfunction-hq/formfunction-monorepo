import { Prisma } from "@prisma/client";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getCurrencyPriceConversionCaseClause(
  columnName: "price" | "priceInLamports"
): Promise<Prisma.Sql> {
  const prisma = getPrisma();
  const allCurrencies = await prisma.currency.findMany({
    where: { solRate: { not: null } },
  });

  return Prisma.raw(`
    CASE
      ${allCurrencies
        .map(
          (cur) =>
            `WHEN "currencyId" = '${
              cur.id
            }'::uuid THEN "${columnName}" / ${cur.solRate!.toNumber()}::float`
        )
        .join("\n")}
      ELSE 0
    END
  `);
}
