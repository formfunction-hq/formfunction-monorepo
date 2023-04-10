SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public."Nft" (
    id text NOT NULL,
    mint text NOT NULL,
    "creatorId" text NOT NULL,
    "timeCreated" timestamp with time zone DEFAULT now() NOT NULL,
    status text NOT NULL,
    "ownerId" text NOT NULL
);
CREATE TABLE public."NftStatus" (
    value text NOT NULL
);
CREATE TABLE public."NftToTag" (
    "nftId" text NOT NULL,
    "tagId" uuid NOT NULL
);
CREATE TABLE public."NftTransaction" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    mint text NOT NULL,
    "timeCreated" timestamp with time zone DEFAULT now() NOT NULL,
    "creatorId" text NOT NULL,
    "toUserId" text NOT NULL,
    "fromUserId" text NOT NULL,
    price bigint,
    type text NOT NULL,
    txid text NOT NULL
);
CREATE TABLE public."NftTransactionType" (
    value text NOT NULL
);
CREATE TABLE public."Photo" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "photoUrl" text NOT NULL,
    "timeCreated" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" text NOT NULL,
    title text,
    description text
);
CREATE TABLE public."Tag" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    value text NOT NULL
);
CREATE TABLE public."User" (
    id text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    bio text,
    "timeCreated" timestamp with time zone DEFAULT now() NOT NULL,
    "twitterName" text,
    "instagramName" text,
    "discordHandle" text,
    "websiteUrl" text,
    "profilePhotoId" uuid,
    "coverPhotoId" uuid
);
ALTER TABLE ONLY public."NftStatus"
    ADD CONSTRAINT "NftStatus_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public."NftToTag"
    ADD CONSTRAINT "NftToTag_pkey" PRIMARY KEY ("nftId", "tagId");
ALTER TABLE ONLY public."NftTransactionType"
    ADD CONSTRAINT "NftTransactionType_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public."NftTransaction"
    ADD CONSTRAINT "NftTransaction_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."NftTransaction"
    ADD CONSTRAINT "NftTransaction_txid_key" UNIQUE (txid);
ALTER TABLE ONLY public."Nft"
    ADD CONSTRAINT "Nft_mint_key" UNIQUE (mint);
ALTER TABLE ONLY public."Nft"
    ADD CONSTRAINT "Nft_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Photo"
    ADD CONSTRAINT "Photo_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_value_key" UNIQUE (value);
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_coverPhotoId_key" UNIQUE ("coverPhotoId");
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_profilePhotoId_key" UNIQUE ("profilePhotoId");
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_username_key" UNIQUE (username);
ALTER TABLE ONLY public."NftToTag"
    ADD CONSTRAINT "NftToTag_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES public."Nft"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."NftToTag"
    ADD CONSTRAINT "NftToTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."NftTransaction"
    ADD CONSTRAINT "NftTransaction_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."NftTransaction"
    ADD CONSTRAINT "NftTransaction_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."NftTransaction"
    ADD CONSTRAINT "NftTransaction_mint_fkey" FOREIGN KEY (mint) REFERENCES public."Nft"(mint) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."NftTransaction"
    ADD CONSTRAINT "NftTransaction_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."NftTransaction"
    ADD CONSTRAINT "NftTransaction_type_fkey" FOREIGN KEY (type) REFERENCES public."NftTransactionType"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Nft"
    ADD CONSTRAINT "Nft_creator_fkey" FOREIGN KEY ("creatorId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Nft"
    ADD CONSTRAINT "Nft_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Nft"
    ADD CONSTRAINT "Nft_status_fkey" FOREIGN KEY (status) REFERENCES public."NftStatus"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Photo"
    ADD CONSTRAINT "Photo_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_coverPhotoId_fkey" FOREIGN KEY ("coverPhotoId") REFERENCES public."Photo"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_profilePhotoId_fkey" FOREIGN KEY ("profilePhotoId") REFERENCES public."Photo"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

INSERT INTO public."NftStatus" VALUES ('Auction');
INSERT INTO public."NftStatus" VALUES ('Listed');
INSERT INTO public."NftStatus" VALUES ('Owned');

INSERT INTO public."NftTransactionType" VALUES ('Bid');
INSERT INTO public."NftTransactionType" VALUES ('Listed');
INSERT INTO public."NftTransactionType" VALUES ('ListingCancelled');
INSERT INTO public."NftTransactionType" VALUES ('Minted');
INSERT INTO public."NftTransactionType" VALUES ('Sold');