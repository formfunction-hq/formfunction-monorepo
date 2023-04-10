// From https://github.com/GoogleChromeLabs/jsbi/issues/30
function jsonStringifyBigint(object: any) {
  return JSON.stringify(object, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

// Adapted from https://gist.github.com/bennettmcelwee/06f0cadd6a41847f848b4bd2a351b6bc
function jsonStringifyMaxDepth(obj: any, depth: number): string {
  if (!obj || typeof obj !== "object") {
    return jsonStringifyBigint(obj);
  }

  if (depth === 0) {
    return '"<?>"';
  }

  const recursiveResult = Object.keys(obj)
    .map((key) => {
      const val = jsonStringifyMaxDepth(obj[key], depth - 1);
      return `"${key}":${val}`;
    })
    .join(",");

  return `{${recursiveResult}}`;
}

// From https://github.com/GoogleChromeLabs/jsbi/issues/30
// eslint-disable-next-line @typescript-eslint/ban-types
export default function jsonStringify(object: Object, depth?: number) {
  if (depth == null) {
    return jsonStringifyBigint(object);
  }

  return jsonStringifyMaxDepth(object, depth);
}
