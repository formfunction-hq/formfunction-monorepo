import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";

const HUMAN_READABLE_MINT_PHASE: Record<CandyMachineMintPhase, string> = {
  [CandyMachineMintPhase.Premint]: "Status: Premint",
  [CandyMachineMintPhase.Allowlist]: "Status: Allowlist Sale is open",
  [CandyMachineMintPhase.Public]: "Status: Public Sale is open",
  [CandyMachineMintPhase.Expired]: "Status: Mint is over",
};

export default HUMAN_READABLE_MINT_PHASE;
