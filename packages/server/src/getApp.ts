/* eslint-disable prefer-arrow-callback */
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import type { Express } from "express-serve-static-core";
import { v4 } from "uuid";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request } from "express";
import logErrors from "src/middleware/logErrors";
import hasuraWebhook from "src/rest/hasuraWebhook";
import nftEditionsWebhook from "src/rest/hasura/nftEditionsWebhook";
import nftMetadataWebhook from "src/rest/hasura/nftMetadataWebhook";
import createNotificationsWebhook from "src/rest/hasura/notifs/createNotificationsWebhook";
import userWhitelistWebhook from "src/rest/hasura/userWhitelistWebhook";
import whitelistWebhook from "src/rest/hasura/whitelistWebhook";
import twitterAuthCallback from "src/rest/social/twitterAuthCallback";
import "src/utils/firebase/firebaseApp";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import initSentry from "src/utils/analytics/initSentry";
import createLastBidPriceWebhook from "src/rest/hasura/createLastBidPriceWebhook";
import createLastBidPriceEndpoint from "src/rest/createLastBidPriceEndpoint";
import fetchNftMetadata from "src/rest/intern/nfts/fetchNftMetadata";
import fetchUserByUsername from "src/rest/intern/users/fetchUserByUsername";
import buyerEscrowBalance from "src/rest/intern/users/buyerEscrowBalance";
import txsForNft from "src/rest/intern/nfts/txsForNft";
import tx from "src/rest/intern/txs/tx";
import fetchNftRawTxs from "src/rest/intern/nftRawTxs/fetchNftRawTxs";
import refund from "src/rest/intern/refund";
import isNftSyncedEndpoint from "src/rest/isNftSyncedEndpoint";
import notifyNftUpdateWebhook from "src/rest/hasura/notifyNftUpdateWebhook";
import notifyNewTransactionWebhook from "src/rest/hasura/notifyNewTransactionWebhook";
import syncAuctionTxs from "src/rest/intern/syncAuctionTxs";
import pushHasuraPerfToLoki from "src/rest/intern/pushHasuraPerfToLoki";
import failedTransactionCheckWebhook from "src/rest/hasura/failedTransactionCheckWebhook";
import AnalyticsEventSource from "src/types/enums/AnalyticsEventSource";
import parseTx from "src/rest/intern/parseTx";
import muxCreateClipEndpoint from "src/rest/intern/muxCreateClipEndpoint";
import muxInsertClip from "src/rest/intern/muxInsertClip";
import uploadToMuxWebhook from "src/rest/hasura/uploadToMuxWebhook";
import muxWebhook from "src/rest/mux/muxWebhook";
import processFinishedAuctionsHandler from "src/rest/intern/processFinishedAuctionsHandler";
import getBundlrNodeBalance from "src/rest/intern/getBundlrNodeBalance";
import fundBundlrNode from "src/rest/intern/fundBundlrNode";
import syncOnchainTxs from "src/rest/intern/syncOnchainTxs";
import newArtistSubmissionWebhook from "src/rest/hasura/newArtistSubmissionWebhook";
import newVoteWebhook from "src/rest/hasura/newVoteWebhook";
import updateArtistSubmissionWebhook from "src/rest/hasura/updateArtistSubmissionWebhook";
import areNftsSyncedEndpoint from "src/rest/areNftsSyncedEndpoint";
import nftHeroInfo from "src/rest/nftHeroInfo";
import createContext from "src/utils/analytics/createContext";
import apolloSentryPlugin from "src/utils/analytics/apolloSentryPlugin";
import uploadMetadataWithGifPreview from "src/rest/uploadMetadataWithGifPreview";
import healthcheck from "src/rest/healthcheck";
import checkRpc from "src/rest/intern/checkRpc";
import creatorStats from "src/rest/stats/creatorStats";
import getAuctions from "src/rest/getAuctions";
import getLastAuctionInfo from "src/rest/getLastAuctionInfo";
import playbackIdToAssetId from "src/rest/intern/playbackIdToAssetId";
import verifySignatureEndpoint from "src/rest/verifySignatureEndpoint";
import logEventToLokiEndpoint from "src/rest/intern/logEventToLokiEndpoint";
import fetchUserSeries from "src/rest/intern/users/fetchUserSeries";
import userInfo from "src/rest/particles/userInfo";
import checkRefundableAmounts from "src/rest/intern/checkRefundableAmounts";
import seriesUploadPreviewImageWebhook from "src/rest/hasura/seriesUploadPreviewImageWebhook";
import insertHolaplexTxs from "src/rest/intern/holaplex/insertHolaplexTxs";
import transferTxs from "src/rest/intern/transferTxs";
import syncNftMetadataEndpoint from "src/rest/intern/nfts/syncNftMetadataEndpoint";
import holaplexAuctionInfoEndpoint from "src/rest/intern/holaplex/holaplexAuctionInfoEndpoint";
import uploadImportedAssetWebhook from "src/rest/hasura/uploadImportedAssetWebhook";
import uploadImportedAssetEndpoint from "src/rest/intern/uploadImportedAssetEndpoint";
import getTwitterUserByUsername from "src/rest/intern/twitter/getTwitterUserByUsername";
import instagramAuthCallback from "src/rest/social/instagramAuthCallback";
import discordAuthCallback from "src/rest/social/discordAuthCallback";
import loginFirebase from "src/rest/firebase/loginFirebase";
import lastBidPrice from "src/rest/intern/lastBidPrice";
import cancelOldBids from "src/rest/intern/cancelOldBids";
import notifyCollabRequestWebhook from "src/rest/hasura/notifyCollabRequestWebhook";
import settleOverdueAuctions from "src/rest/intern/settleOverdueAuctions";
import logEvent from "src/utils/analytics/logEvent";
import updateScheduledAuctions from "src/rest/intern/updateScheduledAuctions";
import auctionWonUpdatePnftDrop from "src/rest/hasura/auctionWonUpdatePnftDrop";
import airdropSol from "src/rest/intern/airdropSol";
import dayjs from "dayjs";
import processExpiredOffersHandler from "src/rest/intern/processExpiredOffersHandler";
import remindPnftClaimants from "src/rest/intern/remindPnftClaimants";
import extendAuctionsIfLowTpsEndpoint from "src/rest/intern/extendAuctionsIfLowTpsEndpoint";
import uploadFirebaseAssetToArweaveEndpoint from "src/rest/intern/uploadFirebaseAssetToArweaveEndpoint";
import loadAccount from "src/rest/intern/loadAccount";
import checkActiveOffersEndpoint from "src/rest/intern/checkActiveOffersEndpoint";
import soldOutEditionsWebhook from "src/rest/hasura/soldOutEditionsWebhook";
import updateExchangeRates from "src/rest/intern/updateExchangeRates";
import processFinishedPnftDropsHandler from "src/rest/intern/processFinishedPnftDropsHandler";
import createTradeStateEndpoint from "src/rest/intern/createTradeStateEndpoint";
import updateDistributorForAuctionMint from "src/rest/intern/updateDistributorForAuctionMint";
import sleepEndpoint from "src/rest/intern/test/sleepEndpoint";
import loadNftEndpoint from "src/rest/intern/test/loadNftEndpoint";
import loadUsersEndpoint from "src/rest/intern/test/loadUsersEndpoint";
import logNginxErrors from "src/rest/intern/logNginxErrors";
import loadDevTableEndpoint from "src/rest/intern/test/loadDevTableEndpoint";
import nftPageLoadTest from "src/rest/intern/test/nftPageLoadTest";
import validateInternHeaders from "src/utils/intern/validateInternHeaders";
import checkSolanaBlockTime from "src/rest/intern/checkSolanaBlockTime";
import refundOffer from "src/rest/intern/refundOffer";
import backfillMissingEditions from "src/rest/intern/editions/backfillMissingEditions";
import buyEditions from "src/rest/intern/editions/buyEditions";
import login from "src/rest/login";
import depthLimit from "graphql-depth-limit";
import { createComplexityLimitRule } from "graphql-validation-complexity";
import createAuctionAlmostOverNotifications from "src/rest/intern/createAuctionAlmostOverNotifications";
import issueCreatorInvites from "src/rest/intern/issueCreatorInvites";
import auctionWonUpdateUnlockableWinner from "src/rest/hasura/auctionWonUpdateUnlockableWinner";
import fetchUserCampaign from "src/rest/intern/users/fetchUserCampaign";
import userSetProfileMixpanelWebhook from "src/rest/hasura/mixpanel/userSetProfileMixpanelWebhook";
import nftTransactionSendEventToMixpanelWebhook from "src/rest/hasura/mixpanel/nftTransactionSendEventToMixpanelWebhook";
import upsertSpotlight from "src/rest/intern/upsertSpotlight";
import nftInfo from "src/rest/crossmint/nftInfoEndpoint";
import getSpotlightInfo from "src/rest/intern/getSpotlightInfo";
import signLegacyTransactionWithAntiBotAuthority from "src/rest/signLegacyTransactionWithAntiBotAuthority";
import updateEnableFrontpageSpotlightEndpoint from "src/rest/intern/updateEnableFrontpageSpotlightEndpoint";
import insertActivityNotificationWebhook from "src/rest/hasura/insertActivityNotificationWebhook";
import insertTransactionEndpoint from "src/rest/crossmint/insertTransactionEndpoint";
import sendEmailNotificationWebhook from "src/rest/hasura/sendEmailNotificationWebhook";
import importOnchainCandyMachine from "src/rest/intern/importOnchainCandyMachine";
import nftMetadataGifToMp4Webhook from "src/rest/hasura/nftMetadataGifToMp4Webhook";
import incrementCandyMachineTotalAmountMintedWebhook from "src/rest/hasura/incrementCandyMachineTotalAmountMintedWebhook";
import updateIsCollectorForTransactionWebhook from "src/rest/hasura/updateIsCollectorForTransactionWebhook";
import writeCandyMachineInfoToFirestoreEndpoint from "src/rest/intern/writeCandyMachineInfoToFirestoreEndpoint";
import writeCandyMachineInfoWithRarityToFirestoreEndpoint from "src/rest/intern/writeCandyMachineInfoWithRarityToFirestoreEndpoint";
import numberOfNftsToSyncEndpoint from "src/rest/intern/numberOfNftsToSyncEndpoint";
import notifyCampaignCommunityNewUpdateSharedWebhook from "src/rest/hasura/notifyCampaignCommunityNewUpdateSharedWebhook";
import updateCampaignToHolderWebhook from "src/rest/hasura/updateCampaignToHolderWebhook";
import preventInvalidUsernamesWebhook from "src/rest/hasura/preventInvalidUsernamesWebhook";
import checkAccountBalancesEndpoint from "src/rest/intern/checkAccountBalancesEndpoint";
import populateNftTransactionUsdPriceWebhook from "src/rest/hasura/populateNftTransactionUsdPriceWebhook";
import backfillNftTransactionUsdPriceEndpoint from "src/rest/intern/backfillNftTransactionUsdPriceEndpoint";
import createCampaignNotificationsWebhook from "src/rest/hasura/createCampaignNotificationsWebhook";
import createCampaignGoalProgressNotifications from "src/rest/intern/createCampaignGoalProgressNotifications";
import uploadArweaveAssetWebhook from "src/rest/hasura/uploadArweaveAssetWebhook";
import processAirdropWebhook from "src/rest/hasura/processAirdropWebhook";
import processFinishedAirdropsHandler from "src/rest/intern/airdrops/processFinishedAirdropsHandler";
import createOnchainAllowlistForEditionsWebhook from "src/rest/hasura/createOnchainAllowlistForEditionsWebhook";
import updateNftTransactionOnchainFieldsWebhook from "src/rest/hasura/updateNftTransactionOnchainFieldsWebhook";
import signVersionedTransactionWithAntiBotAuthority from "src/rest/signVersionedTransactionWithAntiBotAuthority";
import airdropSendEventToMixpanelWebhook from "src/rest/hasura/mixpanel/airdropSendEventToMixpanelWebhook";
import checkAirdropsHandler from "src/rest/intern/airdrops/checkAirdropsHandler";
import newFollowerWebhook from "src/rest/hasura/newFollowerWebhook";
import syncCampaignHoldersEndpoint from "src/rest/intern/syncCampaignHoldersEndpoint";
import ASYNC_LOCAL_STORAGE from "src/constants/AsyncLocalStorage";
import getOperationName from "src/utils/request/getOperationName";
import AsyncLocalStorageKey from "src/types/enums/AsyncLocalStorageKey";
import getPrisma from "src/utils/prisma/getPrisma";
import SentryTagName from "src/types/enums/SentryTagName";
import MyGateway from "src/utils/graphql/MyGateway";
import syncAllCampaignHoldersEndpoint from "src/rest/intern/syncAllCampaignHoldersEndpoint";
import isProd from "src/utils/isProd";
import getTooniesSwapTxEndpoint from "src/rest/getTooniesSwapTxEndpoint";
import revealTooniesEndpoint from "src/rest/intern/revealTooniesEndpoint";
import getHashlistEndpoint from "src/rest/getHashlistEndpoint";
import sendShutdownEmailsEndpoint from "src/rest/intern/sendShutdownEmailsEndpoint";
import cancelEndpoint from "src/rest/intern/cancelEndpoint";
import delistEndpoint from "src/rest/intern/delistEndpoint";

function getRequestLogString(req: Request) {
  return `${req.method} ${req.originalUrl}${
    req.originalUrl === "/graphql" ? ` ${getOperationName(req)}` : ""
    // @ts-ignore
  } ${req.requestId}`;
}

function useMiddleware(app: Express): void {
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded());
  app.use(cookieParser());
  app.use(function setRequestId(req, res, next) {
    // @ts-ignore
    req.requestId = v4();
    next();
  });

  // So that the function name shows up in Sentry traces
  app.use(function setSentryTransactionTag(req, _res, next) {
    const transaction = Sentry.getCurrentHub().getScope()?.getTransaction();
    if (transaction != null) {
      transaction.setTag(
        SentryTagName.GraphqlOperationName,
        getOperationName(req)
      );
    }
    next();
  });

  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  );

  app.use(function asyncLocalStorage(req, _res, next) {
    ASYNC_LOCAL_STORAGE.run(new Map(), () => {
      const store = ASYNC_LOCAL_STORAGE.getStore();
      if (store != null) {
        store.set(AsyncLocalStorageKey.Request, req);
        // @ts-ignore
        store.set(AsyncLocalStorageKey.RequestId, req.requestId);
        store.set(
          AsyncLocalStorageKey.RequestGraphqlOperationName,
          getOperationName(req)
        );
        store.set(AsyncLocalStorageKey.RequestMethod, req.method);
        store.set(AsyncLocalStorageKey.RequestOriginalUrl, req.originalUrl);
      }
      next();
    });
  });

  app.use(function consoleLogRequest(req, res, next) {
    if (isProd()) {
      // Log basic request info for easier debugging
      // eslint-disable-next-line no-console
      console.log(getRequestLogString(req));
    }

    // Attach handler to "finish" so we log the response status code
    // upon the response being returned
    res.on("finish", () => {
      if (isProd()) {
        // eslint-disable-next-line no-console
        console.log(`${getRequestLogString(req)} - ${res.statusCode}`);
      }
    });
    next();
  });

  app.use(function logToLoki(req, _res, next) {
    // Log all requests to Loki
    if (process.env.MIDDLEWARE_LOGGING === "1") {
      logEvent(AnalyticsEvent.RequestReceived, req);
    }

    next();
  });

  app.use("/intern*", (req, res, next) => {
    if (!validateInternHeaders(req)) {
      res.sendStatus(404);
      return;
    }

    // Keep consistent with Nginx conf
    res.setTimeout(dayjs.duration({ minutes: 40 }).asMilliseconds(), () => {
      res.send(503);
    });

    next();
  });
}

export default async function getApp(): Promise<Express> {
  const app = express();

  initSentry(AnalyticsEventSource.Server, [
    new Tracing.Integrations.Express({
      app,
    }),
  ]);

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler({ ip: true }));
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  // Needed when behind Nginx.
  app.enable("trust proxy");

  useMiddleware(app);

  //
  // GET
  //
  app.get("/hasuraWebhook", logErrors(hasuraWebhook));
  app.get("/login", logErrors(login));

  app.get("/", async (req, res) => {
    res.send(
      `Hello World! Testing... Header X-Nginx-Test = ${
        req.headers["x-nginx-test"] ?? "undefined"
      }, all headers = ${JSON.stringify(req.headers, null, 2)}`
    );
  });
  app.get("/healthcheck", logErrors(healthcheck));
  app.get("/social/twitterCallback", logErrors(twitterAuthCallback));
  app.get("/social/instagramCallback", logErrors(instagramAuthCallback));
  app.get("/social/discordCallback", logErrors(discordAuthCallback));
  app.get(
    "/debug-sentry",
    logErrors(() => {
      throw new Error("Another error");
    })
  );
  app.get("/getAuctions", logErrors(getAuctions));
  app.get("/getLastAuctionInfo", logErrors(getLastAuctionInfo));
  app.post(
    "/preprocessTransaction",
    logErrors(signLegacyTransactionWithAntiBotAuthority)
  );
  app.post(
    "/preprocessVersionedTransaction",
    logErrors(signVersionedTransactionWithAntiBotAuthority)
  );
  app.post("/getTooniesSwapTx", logErrors(getTooniesSwapTxEndpoint));
  app.get("/twitter/:username", logErrors(getTwitterUserByUsername));
  app.get("/verifySignature", logErrors(verifySignatureEndpoint));
  app.get("/getHashlist", logErrors(getHashlistEndpoint));

  // Particles
  app.get("/particles/userInfo", logErrors(userInfo));

  // Crossmint
  app.get("/crossmint/nfts/:mint", logErrors(nftInfo));
  app.post(
    "/crossmint/transactions/insertTransaction",
    logErrors(insertTransactionEndpoint)
  );

  // Stats
  app.get("/stats/creatorStats", logErrors(creatorStats));

  // Intern
  app.get(
    "/intern/prismaMetrics",
    logErrors(async (req, res) => {
      const metrics = await getPrisma().$metrics.json();
      res.json(metrics);
    })
  );
  app.get(
    "/intern/checkAccountBalances",
    logErrors(checkAccountBalancesEndpoint)
  );
  app.get("/intern/checkRpc", logErrors(checkRpc));
  app.get("/intern/isNftSynced", logErrors(isNftSyncedEndpoint));
  app.get("/intern/nftHeroInfo", logErrors(nftHeroInfo));
  app.get("/intern/nfts/:mint/txs", logErrors(txsForNft));
  app.get("/intern/nfts/:mint/metadata", logErrors(fetchNftMetadata));
  // TODO[@arcticmatt][rest-refactor] delete
  app.get("/intern/particles/userInfo", logErrors(userInfo));
  app.get("/intern/loadAccount", logErrors(loadAccount));
  app.get("/intern/parseTx", logErrors(parseTx));
  app.get("/intern/transferTxs", logErrors(transferTxs));
  app.get("/intern/playbackIdToAssetId", logErrors(playbackIdToAssetId));
  app.get(
    "/intern/users/:userId/buyerEscrowBalance",
    logErrors(buyerEscrowBalance)
  );
  app.get("/intern/users/:username", logErrors(fetchUserByUsername));
  app.get(
    "/intern/users/:username/series/:seriesSlug",
    logErrors(fetchUserSeries)
  );
  app.get(
    "/intern/users/:username/campaigns/:campaignSlug",
    logErrors(fetchUserCampaign)
  );
  app.get("/intern/bundlrNodeBalance", logErrors(getBundlrNodeBalance));
  app.get("/intern/lastBidPrice", logErrors(lastBidPrice));
  app.get("/intern/airdropSol", logErrors(airdropSol));
  app.get("/intern/spotlightInfo", logErrors(getSpotlightInfo));
  app.get("/intern/numberOfNftsToSync", logErrors(numberOfNftsToSyncEndpoint));

  // TEST ENDPOINTS
  app.get("/intern/test/sleep", logErrors(sleepEndpoint));
  app.get("/intern/test/loadNft", logErrors(loadNftEndpoint));
  app.get("/intern/test/loadUsers", logErrors(loadUsersEndpoint));
  app.get("/intern/test/loadDevTable", logErrors(loadDevTableEndpoint));
  app.get("/intern/test/nftPageLoadTest", logErrors(nftPageLoadTest));

  //
  // POST
  //
  app.post("/logEventToLoki", logErrors(logEventToLokiEndpoint));
  app.post("/muxWebhook", logErrors(muxWebhook));
  app.post(
    "/uploadMetadataWithGifPreview",
    logErrors(uploadMetadataWithGifPreview)
  );

  app.post("/firebase/login", logErrors(loginFirebase));
  app.post(
    "/hasura/auctionWonUpdatePnftDrop",
    logErrors(auctionWonUpdatePnftDrop)
  );
  app.post(
    "/hasura/auctionWonUpdateUnlockableWinner",
    logErrors(auctionWonUpdateUnlockableWinner)
  );
  app.post(
    "/hasura/createLastBidPriceWebhook",
    logErrors(createLastBidPriceWebhook)
  );
  // TODO: make endpoint name match module name
  app.post("/hasura/emailNotifsWebhook", logErrors(createNotificationsWebhook));
  app.post(
    "/hasura/failedTransactionCheckWebhook",
    logErrors(failedTransactionCheckWebhook)
  );
  app.post(
    "/hasura/incrementCandyMachineTotalAmountMinted",
    logErrors(incrementCandyMachineTotalAmountMintedWebhook)
  );
  app.post(
    "/hasura/insertActivityNotificationWebhook",
    logErrors(insertActivityNotificationWebhook)
  );
  app.post(
    "/hasura/newArtistSubmission",
    logErrors(newArtistSubmissionWebhook)
  );
  app.post("/hasura/newVote", logErrors(newVoteWebhook));
  app.post(
    "/hasura/notifyCollabRequest",
    logErrors(notifyCollabRequestWebhook)
  );
  app.post("/hasura/notifyNftUpdate", logErrors(notifyNftUpdateWebhook));
  app.post(
    "/hasura/notifyNewTransaction",
    logErrors(notifyNewTransactionWebhook)
  );
  app.post("/hasura/nftEditionsWebhook", logErrors(nftEditionsWebhook));
  app.post(
    "/hasura/nftMetadataGifToMp4Webhook",
    logErrors(nftMetadataGifToMp4Webhook)
  );
  app.post("/hasura/nftMetadataWebhook", logErrors(nftMetadataWebhook));
  app.post(
    "/hasura/populateNftTransactionUsdPrice",
    logErrors(populateNftTransactionUsdPriceWebhook)
  );
  app.post(
    "/hasura/preventInvalidUsernamesWebhook",
    logErrors(preventInvalidUsernamesWebhook)
  );
  app.post(
    "/hasura/sendEmailNotificationWebhook",
    logErrors(sendEmailNotificationWebhook)
  );
  app.post(
    "/hasura/seriesUploadPreviewImageWebhook",
    logErrors(seriesUploadPreviewImageWebhook)
  );
  app.post("/hasura/soldOutEditionsWebhook", logErrors(soldOutEditionsWebhook));
  app.post(
    "/hasura/updateArtistSubmission",
    logErrors(updateArtistSubmissionWebhook)
  );
  app.post(
    "/hasura/uploadArweaveAssetWebhook",
    logErrors(uploadArweaveAssetWebhook)
  );
  app.post(
    "/hasura/uploadImportedAssetWebhook",
    logErrors(uploadImportedAssetWebhook)
  );
  app.post(
    "/hasura/updateIsCollectorForTransaction",
    logErrors(updateIsCollectorForTransactionWebhook)
  );
  app.post("/hasura/uploadToMuxWebhook", logErrors(uploadToMuxWebhook));
  app.post("/hasura/whitelistWebhook", logErrors(whitelistWebhook));
  app.post(
    "/hasura/userSetProfileMixpanel",
    logErrors(userSetProfileMixpanelWebhook)
  );
  app.post("/hasura/userWhitelistWebhook", logErrors(userWhitelistWebhook));
  app.post(
    "/hasura/nftTransactionSendEventToMixpanel",
    logErrors(nftTransactionSendEventToMixpanelWebhook)
  );
  app.post(
    "/hasura/airdropSendEventToMixpanel",
    logErrors(airdropSendEventToMixpanelWebhook)
  );
  app.post(
    "/hasura/notifyCampaignCommunityNewUpdateSharedWebhook",
    logErrors(notifyCampaignCommunityNewUpdateSharedWebhook)
  );
  app.post(
    "/hasura/updateCampaignToHolderWebhook",
    logErrors(updateCampaignToHolderWebhook)
  );
  app.post(
    "/hasura/createCampaignNotificationsWebhook",
    logErrors(createCampaignNotificationsWebhook)
  );
  app.post("/hasura/processAirdropWebhook", logErrors(processAirdropWebhook));
  app.post(
    "/hasura/createOnchainAllowlistForEditions",
    logErrors(createOnchainAllowlistForEditionsWebhook)
  );
  app.post(
    "/hasura/updateNftTransactionOnchainFields",
    logErrors(updateNftTransactionOnchainFieldsWebhook)
  );
  app.post("/hasura/newFollowerWebhook", logErrors(newFollowerWebhook));

  // Intern
  app.post("/intern/cancel", logErrors(cancelEndpoint));
  app.post("/intern/delist", logErrors(delistEndpoint));
  app.post("/intern/areNftsSynced", logErrors(areNftsSyncedEndpoint));
  app.post("/intern/cancelOldBids", logErrors(cancelOldBids));
  app.post("/intern/checkActiveOffers", logErrors(checkActiveOffersEndpoint));
  app.post("/intern/checkRefundableAmounts", logErrors(checkRefundableAmounts));
  app.post("/intern/checkSolanaBlockTime", logErrors(checkSolanaBlockTime));
  app.post("/intern/createLastBidPrice", logErrors(createLastBidPriceEndpoint));
  app.post("/intern/createTradeState", logErrors(createTradeStateEndpoint));
  app.post(
    "/intern/extendAuctionsIfLowTps",
    logErrors(extendAuctionsIfLowTpsEndpoint)
  );
  app.post("/intern/settleOverdueAuctions", logErrors(settleOverdueAuctions));
  app.post(
    "/intern/holaplex/holaplexAuctionInfo",
    logErrors(holaplexAuctionInfoEndpoint)
  );
  app.post("/intern/holaplex/insertHolaplexTxs", logErrors(insertHolaplexTxs));
  // TODO[@arcticmatt][rest-refactor]: delete
  app.post("/intern/logEventToLoki", logErrors(logEventToLokiEndpoint));
  app.post("/intern/logNginxErrors", logErrors(logNginxErrors));
  app.post("/intern/refund", logErrors(refund));
  app.post("/intern/refundOffer", logErrors(refundOffer));
  app.post("/intern/txs", logErrors(tx));
  app.post("/intern/nfts/syncNftMetadata", logErrors(syncNftMetadataEndpoint));
  app.post("/intern/nftRawTxs", logErrors(fetchNftRawTxs));
  app.post("/intern/syncOnchainTxs", logErrors(syncOnchainTxs));
  app.post("/intern/syncAuctionTxs", logErrors(syncAuctionTxs));
  app.post("/intern/pushHasuraPerfToLoki", logErrors(pushHasuraPerfToLoki));
  app.post(
    "/intern/processFinishedAuctions",
    logErrors(processFinishedAuctionsHandler)
  );
  app.post(
    "/intern/processExpiredOffers",
    logErrors(processExpiredOffersHandler)
  );
  app.post(
    "/intern/processFinishedPnftDrops",
    logErrors(processFinishedPnftDropsHandler)
  );
  app.post("/intern/remindPnftClaimants", logErrors(remindPnftClaimants));
  app.post("/intern/issueCreatorInvites", logErrors(issueCreatorInvites));
  app.post("/intern/muxCreateClip", logErrors(muxCreateClipEndpoint));
  app.post("/intern/muxInsertClip", logErrors(muxInsertClip));
  app.post("/intern/fundBundlrNode", logErrors(fundBundlrNode));
  app.post(
    // TODO: change endpoint name to match module name
    "/intern/sendAuctionAlmostOverEmails",
    logErrors(createAuctionAlmostOverNotifications)
  );
  app.post(
    "/intern/updateDistributorForAuctionMint",
    logErrors(updateDistributorForAuctionMint)
  );
  app.post("/intern/updateExchangeRates", logErrors(updateExchangeRates));
  app.post(
    "/intern/updateScheduledAuctions",
    logErrors(updateScheduledAuctions)
  );
  app.post(
    "/intern/uploadFirebaseAssetToArweave",
    logErrors(uploadFirebaseAssetToArweaveEndpoint)
  );
  // TODO[@arcticmatt][rest-refactor]: delete
  app.post(
    "/intern/uploadMetadataWithGifPreview",
    logErrors(uploadMetadataWithGifPreview)
  );
  app.post(
    "/intern/uploadImportedAsset",
    logErrors(uploadImportedAssetEndpoint)
  );
  app.post(
    "/intern/backfillNftTransactionUsdPrice",
    logErrors(backfillNftTransactionUsdPriceEndpoint)
  );
  app.post("/intern/buyEditions", logErrors(buyEditions));
  app.post(
    "/intern/backfillMissingEditions",
    logErrors(backfillMissingEditions)
  );
  app.post(
    "/intern/updateEnableFrontpageSpotlight",
    logErrors(updateEnableFrontpageSpotlightEndpoint)
  );
  app.post("/intern/upsertSpotlight", logErrors(upsertSpotlight));
  app.post(
    "/intern/importOnchainCandyMachine",
    logErrors(importOnchainCandyMachine)
  );
  app.post(
    "/intern/writeCandyMachineInfoToFirestore",
    logErrors(writeCandyMachineInfoToFirestoreEndpoint)
  );
  app.post(
    "/intern/writeCandyMachineInfoWithRarityToFirestore",
    logErrors(writeCandyMachineInfoWithRarityToFirestoreEndpoint)
  );
  app.post(
    "/intern/createCampaignGoalProgressNotifications",
    logErrors(createCampaignGoalProgressNotifications)
  );
  app.post(
    "/intern/processFinishedAirdrops",
    logErrors(processFinishedAirdropsHandler)
  );
  app.post("/intern/checkAirdrops", logErrors(checkAirdropsHandler));
  app.post(
    "/intern/syncCampaignHolders",
    logErrors(syncCampaignHoldersEndpoint)
  );
  app.post(
    "/intern/syncAllCampaignHolders",
    logErrors(syncAllCampaignHoldersEndpoint)
  );
  app.post("/intern/revealToonies", logErrors(revealTooniesEndpoint));
  app.post("/intern/sendShutdownEmails", logErrors(sendShutdownEmailsEndpoint));

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  // Optional fallthrough error handler
  app.use((_err: any, _req: any, res: any, _next: any) => {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(`${res.sentry}\n`);
  });

  const apolloServer = new ApolloServer({
    cache: "bounded",
    gateway: new MyGateway(),
    // Needed for Hasura remote schema
    introspection: true,

    plugins: [apolloSentryPlugin],
    validationRules: [
      // TODO[@arcticmatt]: lower this after we get a better sense of query complexities
      createComplexityLimitRule(100_000, {
        formatErrorMessage: (cost) =>
          `Query with cost of ${cost} exceeds complexity limit`,
        listFactor: 10,
        objectCost: 1,

        onCost: (cost) => {
          const shouldSample = Math.random() < 0.1;
          if (cost > 2000 && shouldSample) {
            logEvent(AnalyticsEvent.GraphqlCost, null, { cost });
          }
        },
        scalarCost: 1,
      }),
      depthLimit(20),
    ],
  });
  await apolloServer.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    }),
    expressMiddleware(apolloServer, {
      context: ({ req, res }: any) => createContext({ req, res }),
    })
  );

  return app;
}
