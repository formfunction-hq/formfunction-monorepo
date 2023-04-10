/**
 * @generated SignedSource<<063c53d517b0109560613624bfcf2e03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UploadNftToArweaveInput = {
  fileName: string;
  metadata: NftMetadataV1Input;
  nonstandardFileName?: string | null;
};
export type NftMetadataV1Input = {
  animation_url?: string | null;
  attributes?: ReadonlyArray<NftMetadataV1AttributeInput> | null;
  collection?: NftMetadataV1CollectionInput | null;
  description: string;
  external_url?: string | null;
  name: string;
  properties: NftMetadataV1PropertiesInput;
  seller_fee_basis_points: number;
  symbol: string;
};
export type NftMetadataV1AttributeInput = {
  trait_type: string;
  value: string;
};
export type NftMetadataV1CollectionInput = {
  family?: string | null;
  name?: string | null;
};
export type NftMetadataV1PropertiesInput = {
  category?: string | null;
  creators: ReadonlyArray<NftMetadataV1CreatorPropertyInput>;
  files?: ReadonlyArray<NftMetadataV1FilePropertyInput> | null;
};
export type NftMetadataV1CreatorPropertyInput = {
  address: string;
  share: number;
  verified: boolean;
};
export type NftMetadataV1FilePropertyInput = {
  cdn?: boolean | null;
  type: string;
  uri: string;
};
export type useUploadNftToArweaveMutation$variables = {
  input: UploadNftToArweaveInput;
};
export type useUploadNftToArweaveMutation$data = {
  readonly uploadNftToArweave: {
    readonly assetTxid: string;
    readonly metadataTxid: string;
    readonly nonstandardAssetTxid: string | null;
  };
};
export type useUploadNftToArweaveMutation = {
  response: useUploadNftToArweaveMutation$data;
  variables: useUploadNftToArweaveMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UploadNftToArweaveResponse",
    "kind": "LinkedField",
    "name": "uploadNftToArweave",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "assetTxid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "metadataTxid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "nonstandardAssetTxid",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUploadNftToArweaveMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUploadNftToArweaveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3e3dbbe0faf340131d6d2cb93c0bc05a",
    "id": null,
    "metadata": {},
    "name": "useUploadNftToArweaveMutation",
    "operationKind": "mutation",
    "text": "mutation useUploadNftToArweaveMutation(\n  $input: UploadNftToArweaveInput!\n) {\n  uploadNftToArweave(input: $input) {\n    assetTxid\n    metadataTxid\n    nonstandardAssetTxid\n  }\n}\n"
  }
};
})();

(node as any).hash = "0a00e1ff7cfd1cbbb3a68bff49c09a96";

export default node;
