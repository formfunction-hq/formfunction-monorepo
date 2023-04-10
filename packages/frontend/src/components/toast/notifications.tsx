/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import { notification } from "antd";
import type { ArgsProps, NotificationInstance } from "antd/lib/notification";
import { ReactNode } from "react";
import ReactDOMServer from "react-dom/server";
import styles from "css/toast/notifications.module.css";
import getExplorerTxLink from "utils/solana/explorer/getExplorerTxLink";
import getSolanaNetwork from "utils/env/getSolanaNetwork";
import PlainExternalLink from "components/link/PlainExternalLink";
import shortenTxid from "utils/shortenTxid";

interface INotifyArgs {
  description?: ReactNode;
  duration?: number;
  message?: string;
  placement?: ArgsProps["placement"];
  txid?: string;
  txids?: Array<string>;
  type?: keyof NotificationInstance;
}

export const InsufficientSOLMessage: INotifyArgs = {
  description:
    "Your account does not have enough SOL to pay for this transaction. Please fund your account.",
  message: "Insufficient SOL balance",
  type: "error",
};

export function notify({
  duration = 3,
  message,
  description,
  txid,
  txids,
  type = "info",
  placement = "bottomLeft",
}: INotifyArgs): void {
  // log for Sentry and other debug purposes
  const logLevel =
    type === "warning" ? "warn" : type === "error" ? "error" : "info";
  // eslint-disable-next-line no-console
  console[logLevel](
    `Notify: ${message ?? "<no message>"} -- ${
      typeof description === "string"
        ? description
        : // eslint-disable-next-line react/jsx-no-useless-fragment
          ReactDOMServer.renderToStaticMarkup(<>{description}</>)
    }`,
    {
      env: getSolanaNetwork(),
      txid,
      txids,
      type,
    }
  );

  if (txids?.length === 1) {
    // eslint-disable-next-line prefer-destructuring
    txid = txids[0];
  }
  if (txid) {
    description = (
      <div>
        View Transaction:{" "}
        <PlainExternalLink href={getExplorerTxLink(txid)}>
          {shortenTxid(txid)}
        </PlainExternalLink>
      </div>
    );
  } else if (txids) {
    description = (
      <div>
        View Transactions:{" "}
        <div
          style={{
            display: "inline-flex",
            gap: 4,
          }}
        >
          {txids.map((txid, i) => (
            <PlainExternalLink key={i} href={getExplorerTxLink(txid)}>
              [{i + 1}]
            </PlainExternalLink>
          ))}
        </div>
      </div>
    );
  }

  notification[type]({
    className: styles.notification,
    closeIcon: <div />,
    description,
    duration,
    message,
    placement,
  });
}
