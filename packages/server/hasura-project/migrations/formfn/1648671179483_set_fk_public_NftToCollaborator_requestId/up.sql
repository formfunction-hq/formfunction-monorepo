alter table "public"."NftToCollaborator"
  add constraint "NftToCollaborator_requestId_fkey"
  foreign key ("requestId")
  references "public"."Request"
  ("id") on update restrict on delete restrict;
