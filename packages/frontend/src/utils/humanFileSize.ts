export default function humanFileSize(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  // @ts-ignore
  return `${(size / 1000 ** i).toFixed(2) * 1} ${
    ["B", "kB", "MB", "GB", "TB"][i]
  }`;
}
