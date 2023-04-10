BEGIN TRANSACTION;
ALTER TABLE "public"."CandyMachineMerkleAllowlistInfo" DROP CONSTRAINT "CandyMachineMerkleAllowlistInfo_pkey";

ALTER TABLE "public"."CandyMachineMerkleAllowlistInfo"
    ADD CONSTRAINT "CandyMachineMerkleAllowlistInfo_pkey" PRIMARY KEY ("userId", "candyMachineId");
COMMIT TRANSACTION;
