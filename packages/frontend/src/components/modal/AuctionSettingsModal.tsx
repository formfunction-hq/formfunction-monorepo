import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/AuctionSettingsModal.module.css";
import { useState } from "react";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import logIfNotProd from "utils/logIfNotProd";
import { AuctionSettingsModal_MetadataAccount$key } from "components/modal/__generated__/AuctionSettingsModal_MetadataAccount.graphql";
import AuctionTimeSection from "components/modal/AuctionTimeSection";
import dayjs from "utils/dates/dayjsex";
import { AuctionSettingsModalMutation } from "components/modal/__generated__/AuctionSettingsModalMutation.graphql";
import updateNftAuctionSettings from "utils/relay/updaters/updateNftAuctionSettings";
import { Dayjs } from "dayjs";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ListingScheduledAuctionInputs from "components/listing/ListingScheduledAuctionInputs";
import InputWithLabel from "components/input/InputWithLabel";
import InputLabel from "components/input/InputLabel";
import getScheduledAuctionDateAndTime from "utils/dates/getDayjsFromDateAndTime";
import SCHEDULED_AUCTION_DESCRIPTION from "constants/ScheduledAuctionDescription";
import TickSizeType from "types/enums/TickSizeType";
import ListingTickSizeInput from "components/listing/ListingTickSizeInput";
import isValidPrice from "utils/price/isValidPrice";
import MaxDecimals from "types/enums/MaxDecimals";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import { PublicKey } from "@solana/web3.js";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import useGetCurrencyConfigForPrice from "hooks/useGetCurrencyConfigForPrice";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import ErrorMessage from "components/text/ErrorMessage";

const mutation = graphql`
  mutation AuctionSettingsModalMutation(
    $pk_columns: NftListing_pk_columns_input!
    $set: NftListing_set_input!
  ) {
    update_NftListing_by_pk(_set: $set, pk_columns: $pk_columns) {
      id
    }
  }
`;

const fragment = graphql`
  fragment AuctionSettingsModal_MetadataAccount on MetadataAccount {
    mint

    nft {
      priceV2 {
        ...useGetCurrencyConfigForPrice_Price
        ...useAuctionHouseSdkForPrice_Price
      }
      auctionDurationInSeconds
      scheduledAuctionTime
      timeExtensionDurationInSeconds

      tickSizeInfo {
        tickSizeConstantInLamports
      }
    }
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: AuctionSettingsModal_MetadataAccount$key;
  onHide: () => void;
};

function Inner({ isShown, metadataAccount, onHide }: Props) {
  const { anchorWallet, connection } = useSolanaContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const auctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const [commit] = useMutation<AuctionSettingsModalMutation>(mutation);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [auctionTime, setAuctionTime] = useState(
    dayjs.duration(metadataAccountData.nft.auctionDurationInSeconds, "seconds")
  );
  const [endTime, setEndTime] = useState(
    dayjs.duration(
      metadataAccountData.nft.timeExtensionDurationInSeconds,
      "seconds"
    )
  );
  const currentScheduledAuctionTime =
    metadataAccountData.nft.scheduledAuctionTime == null
      ? null
      : dayjs(metadataAccountData.nft.scheduledAuctionTime);
  const [scheduledAuctionDate, setScheduledAuctionDate] = useState(
    currentScheduledAuctionTime ?? dayjs()
  );
  const [scheduledAuctionTime, setScheduledAuctionTime] = useState<
    Maybe<Dayjs>
  >(currentScheduledAuctionTime ?? null);
  const [tzCode, setTzCode] = useState(dayjs.tz.guess());
  const {
    tickSizeInfo: { tickSizeConstantInLamports },
  } = metadataAccountData.nft;
  const currencyConfig = useGetCurrencyConfigForPrice(
    metadataAccountData.nft.priceV2!
  );
  const [tickSizeConstantInSol, setTickSizeConstantInSol] = useState<string>(
    tickSizeConstantInLamports == null
      ? ""
      : formatDecimals(tickSizeConstantInLamports, currencyConfig.decimals)
  );
  const [tickSizeType, setTickSizeType] = useState<TickSizeType>(
    tickSizeConstantInLamports == null
      ? TickSizeType.Default
      : TickSizeType.Fixed
  );
  const hasError =
    (tickSizeType === TickSizeType.Fixed &&
      !isValidPrice(
        tickSizeConstantInSol,
        currencyConfig.decimals,
        MaxDecimals.TickSize
      )) ||
    (currentScheduledAuctionTime != null && scheduledAuctionTime == null);

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="Edit auction settings"
    >
      <div className={styles.body}>
        <div className={styles.inputs}>
          <AuctionTimeSection
            auctionTime={auctionTime}
            endTime={endTime}
            setAuctionTime={setAuctionTime}
            setEndTime={setEndTime}
          />
          {currentScheduledAuctionTime != null && (
            <InputWithLabel
              input={
                <ListingScheduledAuctionInputs
                  scheduledAuctionDate={scheduledAuctionDate}
                  scheduledAuctionTime={scheduledAuctionTime}
                  setScheduledAuctionDate={setScheduledAuctionDate}
                  setScheduledAuctionTime={setScheduledAuctionTime}
                  setTzCode={setTzCode}
                  showErrors={showErrors}
                  tzCode={tzCode}
                />
              }
              label={
                <InputLabel
                  label="Schedule auction"
                  subLabel={SCHEDULED_AUCTION_DESCRIPTION}
                />
              }
            />
          )}
          <ListingTickSizeInput
            currencyConfigOverride={currencyConfig}
            setTickSizeConstantInSol={setTickSizeConstantInSol}
            setTickSizeType={setTickSizeType}
            showErrors={showErrors}
            tickSizeConstantInSol={tickSizeConstantInSol}
            tickSizeType={tickSizeType}
          />
        </div>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.saveButton}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={async () => {
            if (hasError) {
              setShowErrors(true);
              return;
            }

            setIsLoading(true);

            const scheduledAuctionDateAndTime =
              currentScheduledAuctionTime == null ||
              scheduledAuctionTime == null
                ? undefined
                : getScheduledAuctionDateAndTime(
                    scheduledAuctionDate,
                    scheduledAuctionTime,
                    tzCode
                  );
            const auctionEndTime =
              scheduledAuctionDateAndTime == null
                ? undefined
                : scheduledAuctionDateAndTime.add(auctionTime);
            const tickSizeConstantInLamportsNew =
              tickSizeType !== TickSizeType.Fixed
                ? null
                : convertToFullDecimals(
                    tickSizeConstantInSol,
                    currencyConfig.decimals
                  );

            if (tickSizeConstantInLamportsNew !== tickSizeConstantInLamports) {
              invariant(anchorWallet != null);
              invariant(auctionHouseSdk != null);
              const mintKey = new PublicKey(metadataAccountData.mint);
              const tokenAccount = await getNftMintTokenAccountAddressOrAta(
                connection,
                mintKey,
                anchorWallet.publicKey
              );
              const setTickSizeTx = await auctionHouseSdk.setTickSizeTx(
                {
                  owner: anchorWallet.publicKey,
                  tokenAccount,
                  tokenMint: mintKey,
                },
                {
                  tickSizeConstantInLamports:
                    tickSizeConstantInLamportsNew ?? 0,
                }
              );

              const txid = await sendTransactionWithWallet({
                afterSignCallback: (unfinalizedTxid) => {
                  commitRawTxMutation({
                    extraData: {
                      // We should ignore this when trying to insert txs from NftTransactionRaw
                      shouldIgnore: true,
                      wallet: anchorWallet.publicKey.toString(),
                    },
                    mint: mintKey.toString(),
                    rawTxType: CommitRawTxType.SetTickSize,
                    txid: unfinalizedTxid,
                  });
                },
                connection,
                loggingData: {
                  mint: mintKey.toString(),
                  transactionType: CommitRawTxType.SetTickSize,
                },
                txs: [setTickSizeTx],
                wallet: anchorWallet,
              });

              if (txid == null) {
                setIsLoading(false);
                return;
              }
            }

            commit({
              onCompleted: () => {
                setIsLoading(false);
                onHide();
              },
              onError: (e) => {
                logIfNotProd("error changing auction settings (graphql)", e);
                notifyUnexpectedError();
              },
              updater: (store) => {
                updateNftAuctionSettings(
                  store,
                  metadataAccountData.mint,
                  auctionTime,
                  endTime,
                  tickSizeConstantInLamportsNew,
                  scheduledAuctionDateAndTime
                );
              },
              variables: {
                pk_columns: {
                  nftId: metadataAccountData.mint,
                },
                set: {
                  auctionDurationInSeconds: auctionTime.asSeconds(),
                  auctionEndTime: auctionEndTime?.toString() ?? undefined,
                  scheduledAuctionTime:
                    scheduledAuctionDateAndTime?.toString() ?? undefined,
                  tickSizeConstantInLamports: tickSizeConstantInLamportsNew,
                  timeExtensionDurationInSeconds: endTime.asSeconds(),
                },
              },
            });
          }}
        >
          Save
        </ButtonWithText>
        {hasError && showErrors && (
          <ErrorMessage fontClass={FontClass.Body1}>
            Please make sure all inputs are valid.
          </ErrorMessage>
        )}
      </div>
    </GenericModal>
  );
}

export default function AuctionSettingsModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): Maybe<JSX.Element> {
  if (!isShown) {
    // Early return here because in Inner, we make some assumptions that certain
    // values are not null, which may not always be true if this modal is hidden.
    // For example, if an NFT is unlisted, then metadataAccountData.nft.priceV2
    // will turn into null.
    return null;
  }

  return (
    <Inner
      isShown={isShown}
      metadataAccount={metadataAccount}
      onHide={onHide}
    />
  );
}
