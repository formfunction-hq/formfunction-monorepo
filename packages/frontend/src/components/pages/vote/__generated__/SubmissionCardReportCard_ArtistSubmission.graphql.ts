/**
 * @generated SignedSource<<1c4fcc965bd3aaa5c0e608f79c80d111>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionCardReportCard_ArtistSubmission$data = {
  readonly id: string;
  readonly reportCountArtSamplesDoNotMatch: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly reportCountArtistNotApplicant: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly reportCountTwitterAccountTooNew: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly reportCountVeryFewFollowers: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly reportsWithOtherReason: ReadonlyArray<{
    readonly id: string;
    readonly reportReasons: any | null;
  }>;
  readonly " $fragmentType": "SubmissionCardReportCard_ArtistSubmission";
};
export type SubmissionCardReportCard_ArtistSubmission$key = {
  readonly " $data"?: SubmissionCardReportCard_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionCardReportCard_ArtistSubmission">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "_and.0",
  "value": {
    "voteType": {
      "_eq": "ReportSubmission"
    }
  }
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Vote_aggregate_fields",
    "kind": "LinkedField",
    "name": "aggregate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "count",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "artSamplesDoNotMatch"
    },
    {
      "kind": "RootArgument",
      "name": "artistNotApplicant"
    },
    {
      "kind": "RootArgument",
      "name": "otherReason"
    },
    {
      "kind": "RootArgument",
      "name": "twitterAccountTooNew"
    },
    {
      "kind": "RootArgument",
      "name": "veryFewFollowers"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionCardReportCard_ArtistSubmission",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "reportCountTwitterAccountTooNew",
      "args": [
        {
          "fields": [
            {
              "items": [
                (v1/*: any*/),
                {
                  "fields": [
                    {
                      "fields": [
                        {
                          "kind": "Variable",
                          "name": "_contains",
                          "variableName": "twitterAccountTooNew"
                        }
                      ],
                      "kind": "ObjectValue",
                      "name": "reportReasons"
                    }
                  ],
                  "kind": "ObjectValue",
                  "name": "_and.1"
                }
              ],
              "kind": "ListValue",
              "name": "_and"
            }
          ],
          "kind": "ObjectValue",
          "name": "where"
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": "reportCountVeryFewFollowers",
      "args": [
        {
          "fields": [
            {
              "items": [
                (v1/*: any*/),
                {
                  "fields": [
                    {
                      "fields": [
                        {
                          "kind": "Variable",
                          "name": "_contains",
                          "variableName": "veryFewFollowers"
                        }
                      ],
                      "kind": "ObjectValue",
                      "name": "reportReasons"
                    }
                  ],
                  "kind": "ObjectValue",
                  "name": "_and.1"
                }
              ],
              "kind": "ListValue",
              "name": "_and"
            }
          ],
          "kind": "ObjectValue",
          "name": "where"
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": "reportCountArtSamplesDoNotMatch",
      "args": [
        {
          "fields": [
            {
              "items": [
                (v1/*: any*/),
                {
                  "fields": [
                    {
                      "fields": [
                        {
                          "kind": "Variable",
                          "name": "_contains",
                          "variableName": "artSamplesDoNotMatch"
                        }
                      ],
                      "kind": "ObjectValue",
                      "name": "reportReasons"
                    }
                  ],
                  "kind": "ObjectValue",
                  "name": "_and.1"
                }
              ],
              "kind": "ListValue",
              "name": "_and"
            }
          ],
          "kind": "ObjectValue",
          "name": "where"
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": "reportCountArtistNotApplicant",
      "args": [
        {
          "fields": [
            {
              "items": [
                (v1/*: any*/),
                {
                  "fields": [
                    {
                      "fields": [
                        {
                          "kind": "Variable",
                          "name": "_contains",
                          "variableName": "artistNotApplicant"
                        }
                      ],
                      "kind": "ObjectValue",
                      "name": "reportReasons"
                    }
                  ],
                  "kind": "ObjectValue",
                  "name": "_and.1"
                }
              ],
              "kind": "ListValue",
              "name": "_and"
            }
          ],
          "kind": "ObjectValue",
          "name": "where"
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": "reportsWithOtherReason",
      "args": [
        {
          "fields": [
            {
              "items": [
                (v1/*: any*/),
                {
                  "fields": [
                    {
                      "fields": [
                        {
                          "kind": "Variable",
                          "name": "_contains",
                          "variableName": "otherReason"
                        }
                      ],
                      "kind": "ObjectValue",
                      "name": "reportReasons"
                    }
                  ],
                  "kind": "ObjectValue",
                  "name": "_and.1"
                }
              ],
              "kind": "ListValue",
              "name": "_and"
            }
          ],
          "kind": "ObjectValue",
          "name": "where"
        }
      ],
      "concreteType": "Vote",
      "kind": "LinkedField",
      "name": "Votes",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "reportReasons",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistSubmission",
  "abstractKey": null
};
})();

(node as any).hash = "6b0593f7606b0263af1bb96d0362fd2c";

export default node;
