import { UnlockableWinner } from "@prisma/client";
import ConvertUserType from "src/types/convert/ConvertUserType";

type ConvertUnlockableWinnerType = UnlockableWinner & { User: ConvertUserType };

export default ConvertUnlockableWinnerType;
