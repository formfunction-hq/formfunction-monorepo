alter table "public"."Reaction"
  add constraint "Reaction_type_fkey"
  foreign key ("type")
  references "public"."ReactionType"
  ("value") on update cascade on delete cascade;
