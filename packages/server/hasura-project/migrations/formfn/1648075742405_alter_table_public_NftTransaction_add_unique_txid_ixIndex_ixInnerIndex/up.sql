alter table "public"."NftTransaction" add constraint "NftTransaction_txid_ixIndex_ixInnerIndex_key" unique ("txid", "ixIndex", "ixInnerIndex");
