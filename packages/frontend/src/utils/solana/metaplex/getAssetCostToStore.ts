export const LAMPORT_MULTIPLIER = 10 ** 9;
const WINSTON_MULTIPLIER = 10 ** 12;

// TODO: there's also @metaplex/arweave-cost, which for some reasons returns a way lower number...
// I'll stick with this for now, it's temporary until Bundlr adds support anyways.
export default async function getAssetCostToStore(sizes: Array<number>) {
  const totalBytes = sizes.reduce((acc, currVal) => acc + currVal, 0);
  const [txFeeFetch, byteCostFetch] = await Promise.all([
    fetch("https://arweave.net/price/0"),
    fetch(`https://arweave.net/price/${totalBytes.toString()}`),
  ]);
  const [txFeeInWinstons, byteCostInWinstons] = (
    await Promise.all([txFeeFetch.text(), byteCostFetch.text()])
  ).map((text) => parseInt(text, 10));
  const totalArCost =
    (txFeeInWinstons * sizes.length + byteCostInWinstons) / WINSTON_MULTIPLIER;

  let conversionRates = JSON.parse(
    localStorage.getItem("conversionRates") || "{}"
  );

  if (
    !conversionRates ||
    !conversionRates.expiry ||
    conversionRates.expiry < Date.now()
  ) {
    conversionRates = {
      expiry: Date.now() + 5 * 60 * 1000,
      value: JSON.parse(
        await (
          await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=solana,arweave&vs_currencies=usd"
          )
        ).text()
      ),
    };

    if (conversionRates.value.solana) {
      localStorage.setItem("conversionRates", JSON.stringify(conversionRates));
    }
  }

  // To figure out how many lamports are required, multiply ar byte cost by this number
  const arMultiplier =
    conversionRates.value.arweave.usd / conversionRates.value.solana.usd;
  // We also always make a manifest file, which, though tiny, needs payment.
  return LAMPORT_MULTIPLIER * totalArCost * arMultiplier * 1.1;
}
