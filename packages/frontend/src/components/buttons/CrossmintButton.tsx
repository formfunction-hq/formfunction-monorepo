import graphql from "babel-plugin-relay/macro";
import { CrossmintButton_MetadataAccount$key } from "components/buttons/__generated__/CrossmintButton_MetadataAccount.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useFragment } from "react-relay";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import styles from "css/buttons/CrossmintButton.module.css";
import getCreatorsForExecuteSale from "formfn-shared/dist/utils/sale/getCreatorsForExecuteSale";
import getEnvironment from "utils/getEnvironment";
import Environment from "formfn-shared/dist/types/Environment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

function getCrossmintEnvironment() {
  const env = getEnvironment();
  switch (env) {
    case Environment.Development:
    case Environment.Local:
    case Environment.Testnet:
      return "staging";
    case Environment.Production:
      return "production";
    default:
      return assertUnreachable(env);
  }
}

const fragment = graphql`
  fragment CrossmintButton_MetadataAccount on MetadataAccount {
    mint

    data {
      creators {
        # eslint-disable-next-line relay/unused-fields
        address
      }
      name
    }

    nft {
      ownerId
      priceV2 {
        amount
      }
    }

    offchainData {
      description
      image
    }
  }
`;

type Props = {
  metadataAccount: CrossmintButton_MetadataAccount$key;
  onClick?: () => void;
  ownerTokenAccount: string;
};

/**
 * Wraps CrossmintPayButton.
 */
export default function CrossmintButton({
  metadataAccount,
  onClick,
  ownerTokenAccount,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const {
    nft: { ownerId, priceV2 },
  } = metadataAccountData;
  const remainingAccounts = getCreatorsForExecuteSale(
    metadataAccountData.data.creators
  );

  return (
    <CrossmintPayButton
      className={styles.button}
      collectionTitle={metadataAccountData.data.name}
      collectionDescription={metadataAccountData.offchainData.description ?? ""}
      collectionPhoto={metadataAccountData.offchainData.image}
      clientId={process.env.REACT_APP_CROSSMINT_CLIENT_ID as string}
      mintConfig={{
        // Crossmint takes prices in SOL
        buyPrice: priceV2!.amount / LAMPORTS_PER_SOL,
        tokenAccount: ownerTokenAccount,
        tokenMint: metadataAccountData.mint,
        type: "REPLACeME",
        walletCreators:
          remainingAccounts?.map(({ pubkey }) => pubkey.toString()) ?? [],
        walletSeller: ownerId,
      }}
      onClick={onClick}
      environment={getCrossmintEnvironment()}
    />
  );
}
