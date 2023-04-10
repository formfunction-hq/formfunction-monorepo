/**
 * @generated SignedSource<<a586e65c6c542b2dab7e9e9f6bd957b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManualApprovalSubmissionCard_ArtistSubmission$data = {
  readonly id: string;
  readonly reportCount: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly skipCount: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly skipCountCollectors: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly skipCountCreators: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly upvoteCount: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly upvoteCountCollectors: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly upvoteCountCreators: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionCardAssets_ArtistSubmission" | "SubmissionCardReportCard_ArtistSubmission" | "SubmissionCardTwitterStatsTable_ArtistSubmission" | "SubmissionCard_ArtistSubmission">;
  readonly " $fragmentType": "ManualApprovalSubmissionCard_ArtistSubmission";
};
export type ManualApprovalSubmissionCard_ArtistSubmission$key = {
  readonly " $data"?: ManualApprovalSubmissionCard_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManualApprovalSubmissionCard_ArtistSubmission">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "_eq": "Skip"
},
v1 = [
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
],
v2 = {
  "_eq": true
},
v3 = {
  "isWhitelisted": (v2/*: any*/)
},
v4 = {
  "isCollector2": (v2/*: any*/),
  "isWhitelisted": {
    "_eq": false
  }
},
v5 = {
  "_eq": "Upvote"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManualApprovalSubmissionCard_ArtistSubmission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": "skipCount",
      "args": [
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "voteType": (v0/*: any*/)
          }
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "Votes_aggregate(where:{\"voteType\":{\"_eq\":\"Skip\"}})"
    },
    {
      "alias": "skipCountCreators",
      "args": [
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "User": (v3/*: any*/),
            "voteType": (v0/*: any*/)
          }
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "Votes_aggregate(where:{\"User\":{\"isWhitelisted\":{\"_eq\":true}},\"voteType\":{\"_eq\":\"Skip\"}})"
    },
    {
      "alias": "skipCountCollectors",
      "args": [
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "User": (v4/*: any*/),
            "voteType": (v0/*: any*/)
          }
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "Votes_aggregate(where:{\"User\":{\"isCollector2\":{\"_eq\":true},\"isWhitelisted\":{\"_eq\":false}},\"voteType\":{\"_eq\":\"Skip\"}})"
    },
    {
      "alias": "upvoteCount",
      "args": [
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "voteType": (v5/*: any*/)
          }
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "Votes_aggregate(where:{\"voteType\":{\"_eq\":\"Upvote\"}})"
    },
    {
      "alias": "upvoteCountCreators",
      "args": [
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "User": (v3/*: any*/),
            "voteType": (v5/*: any*/)
          }
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "Votes_aggregate(where:{\"User\":{\"isWhitelisted\":{\"_eq\":true}},\"voteType\":{\"_eq\":\"Upvote\"}})"
    },
    {
      "alias": "upvoteCountCollectors",
      "args": [
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "User": (v4/*: any*/),
            "voteType": (v5/*: any*/)
          }
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "Votes_aggregate(where:{\"User\":{\"isCollector2\":{\"_eq\":true},\"isWhitelisted\":{\"_eq\":false}},\"voteType\":{\"_eq\":\"Upvote\"}})"
    },
    {
      "alias": "reportCount",
      "args": [
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "voteType": {
              "_eq": "ReportSubmission"
            }
          }
        }
      ],
      "concreteType": "Vote_aggregate",
      "kind": "LinkedField",
      "name": "Votes_aggregate",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "Votes_aggregate(where:{\"voteType\":{\"_eq\":\"ReportSubmission\"}})"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmissionCard_ArtistSubmission"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmissionCardReportCard_ArtistSubmission"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmissionCardTwitterStatsTable_ArtistSubmission"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmissionCardAssets_ArtistSubmission"
    }
  ],
  "type": "ArtistSubmission",
  "abstractKey": null
};
})();

(node as any).hash = "7850ca5a85d9e226d250220aeb57fa57";

export default node;
