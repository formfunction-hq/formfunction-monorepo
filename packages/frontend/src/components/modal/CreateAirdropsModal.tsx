import GenericModal from "components/modal/GenericModal";
import { Suspense, useCallback, useState } from "react";
import { notify } from "components/toast/notifications";
import CreateAirdropsModalContent from "components/modal/CreateAirdropsModalContent";
import { UserSearchContextProvider } from "context/UserSearchContext";
import FlexBox from "components/layout/FlexBox";
import ArtName from "components/text/ArtName";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { CreateAirdropsModalMutation } from "components/modal/__generated__/CreateAirdropsModalMutation.graphql";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useUserSearchContext from "hooks/useUserSearchContext";
import ColorValue from "types/enums/ColorValue";
import LoadingSpinner from "components/loading/LoadingSpinner";
import useViewerId from "hooks/useViewerId";
import AudienceInputOption from "types/enums/AudienceInputOption";
import AudienceSelectInput from "components/input/AudienceSelectInput";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import invariant from "tiny-invariant";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";

const mutation = graphql`
  mutation CreateAirdropsModalMutation($input: CreateAirdropsInput!) {
    AirdropMutations {
      createAirdrops(input: $input) {
        airdrops {
          id
        }
      }
    }
  }
`;

type Props = {
  isShown: boolean;
  onHide: () => void;
};

function Inner({
  isLoading,
  onHide,
  setIsLoading,
}: {
  isLoading: boolean;
  onHide: () => void;
  setIsLoading: (val: boolean) => void;
}) {
  const viewerId = useViewerId();
  const [commit] = useMutation<CreateAirdropsModalMutation>(mutation);
  const [activeAudienceInputOption, setActiveAudienceInputOption] =
    useState<AudienceInputOption>(AudienceInputOption.SimpleAudienceInput);
  const { selectedAddresses, selectedUsers } = useUserSearchContext();
  const [freeformAddresses, setFreeformAddresses] = useState<Array<string>>([]);
  const getToAddresses = useCallback(() => {
    function switchFn() {
      switch (activeAudienceInputOption) {
        case AudienceInputOption.FreeformWalletInput:
          return freeformAddresses;
        case AudienceInputOption.SimpleAudienceInput:
          return [
            ...selectedUsers.map((item) => item.id),
            ...selectedAddresses,
          ];
        default:
          return assertUnreachable(activeAudienceInputOption);
      }
    }
    const result = switchFn();
    invariant(
      result.length === removeDuplicatesWithSet(result).length,
      "Addresses should be unique"
    );
    return result;
  }, [
    activeAudienceInputOption,
    freeformAddresses,
    selectedAddresses,
    selectedUsers,
  ]);

  if (viewerId == null) {
    return null;
  }

  return (
    <CreateAirdropsModalContent
      audienceSelectSection={
        <FlexBox flexDirection="column" gap={24}>
          <ArtName colorClass={ColorClass.Primary}>
            Who should get this airdrop?
          </ArtName>
          <Suspense
            fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
          >
            <AudienceSelectInput
              activeAudienceInputOption={activeAudienceInputOption}
              setActiveAudienceInputOption={setActiveAudienceInputOption}
              freeformAddresses={freeformAddresses}
              setFreeformAddresses={setFreeformAddresses}
            />
          </Suspense>
        </FlexBox>
      }
      description={
        "You can send an airdrop to anyone using their Formfunction username or wallet address. " +
        "Once the airdrop is sent, they will be notified through email."
      }
      isLoading={isLoading}
      numAirdrops={getToAddresses().length}
      onCreateEditionDistributorCompleted={(mint: string) =>
        new Promise((resolve, reject) => {
          commit({
            onCompleted: () => {
              notify({
                description:
                  "You will be notified once your airdrop has been completed.",
                message: "Airdrop queued!",
                type: "info",
              });
              resolve();
            },
            onError: () => {
              notifyUnexpectedError();
              reject();
            },
            variables: {
              input: {
                masterEditionMint: mint,
                toAddresses: getToAddresses(),
                type: "Gift",
              },
            },
          });
        })
      }
      onHide={onHide}
      setIsLoading={setIsLoading}
    />
  );
}

export default function CreateAirdropsModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const onHideInner = () => {
    if (isLoading) {
      notify({
        duration: 2,
        message: "Please wait for your airdrop to finish setting up",
        type: "info",
      });
      return;
    }

    onHide();
  };

  return (
    <GenericModal title="Airdrop" isShown={isShown} onHide={onHideInner}>
      <UserSearchContextProvider>
        <Inner
          isLoading={isLoading}
          onHide={onHide}
          setIsLoading={setIsLoading}
        />
      </UserSearchContextProvider>
    </GenericModal>
  );
}
