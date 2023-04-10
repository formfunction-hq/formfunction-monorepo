import { Dayjs } from "dayjs";
import HeliusContext from "src/types/enums/helius/HeliusContext";
import HeliusTransactionSource from "src/types/enums/helius/HeliusTransactionSource";
import HeliusTransactionType from "src/types/enums/helius/HeliusTransactionType";

type HeliusTransaction = {
  amount: number;
  buyer: string;
  context: HeliusContext;
  seller: string;
  signature: string;
  source: HeliusTransactionSource;
  timestamp: Dayjs;
  type: HeliusTransactionType;
};

export default HeliusTransaction;
