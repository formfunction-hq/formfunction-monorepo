alter table "public"."CandyMachineMerkleAllowlistInfo"
  add constraint "CandyMachineMerkleAllowlistInfo_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
