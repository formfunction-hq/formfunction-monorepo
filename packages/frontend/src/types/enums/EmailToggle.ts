/* eslint-disable typescript-sort-keys/string-enum */

enum EmailToggle {
  // EmailSection.PiecesYouAreSelling
  YouReceivedABid = "You received a bid",
  YourAuctionEnded = "Your auction ended",
  YourPieceWasSoldAsAnInstantSale = "Your piece was sold as an instant sale",
  YourEditionWasSold = "Your edition was sold",
  YourPieceWasSoldAsASecondarySale = "Your piece was sold as a secondary sale",

  // EmailSection.PiecesYouAreBiddingOn
  YouWereOutbid = "You were outbid",
  AuctionAboutToEnd = "Auction about to end",
  YouWonOrLostAnAuction = "You won or lost an auction",
  AuctionSettledForAPieceYouWon = "Auction settled for a piece you won",

  // EmailSection.PeopleYouFollow
  TheyListedANewPieceForAuction = "They listed a new piece for auction",
  TheyListedNewEditions = "They listed new editions",
  AnAuctionForTheirPieceWasScheduled = "An auction for their piece was scheduled",
  TheirScheduledAuctionStarted = "Their scheduled auction started",
  TheirPieceWasListedOnTheSecondaryMarket = "Their piece was listed on the secondary market",

  // EmailSection.Offers
  YouReceivedAnOfferOnAPieceYouOwn = "You received an offer on a piece you own",
  YourOfferOnAPieceWasAccepted = "Your offer on a piece was accepted",
  YourOfferOnAPieceExpired = "Your offer on a piece expired",

  // EmailSection.Other
  YouCanClaimAParticipationNft = "You can claim a participation NFT",
  SomeoneRequestedYouToCollaborateOnAPiece = "Someone requested you to collaborate on a piece",
  UpdatesAboutUnlockables = "Updates about unlockables",
  NewFollower = "New follower",
}

export default EmailToggle;
