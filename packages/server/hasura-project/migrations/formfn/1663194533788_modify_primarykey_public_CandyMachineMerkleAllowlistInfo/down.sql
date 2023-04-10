alter table "public"."CandyMachineMerkleAllowlistInfo" drop constraint "CandyMachineMerkleAllowlistInfo_pkey";
alter table "public"."CandyMachineMerkleAllowlistInfo"
    add constraint "CandyMachineMerkleAllowlistInfo_pkey"
    primary key ("id");
