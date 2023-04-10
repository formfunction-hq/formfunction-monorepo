const fs = require("fs");
const codegenComment = require("./codegenComment.js");

const CODEGEN_COMMENT = codegenComment("genFonts.js");

//
// HELPERS
//

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFontClasses() {
  const data = fs.readFileSync(
    "src/css/global/fonts/FontVariables.css",
    "utf8"
  );
  const lines = data
    .split("\n")
    .filter(
      (line) =>
        line.includes("--font") ||
        line.includes("--line-height") ||
        line.includes("--letter-spacing")
    );

  const fontClasses = lines.map((line) => {
    const dashSplit = line.split("-");
    return dashSplit[4].split(":")[0];
  });
  return new Array(...new Set(fontClasses));
}

//
// CSS codegen
//

function outputFontClasses(fontClasses) {
  const logger = fs.createWriteStream("src/css/global/fonts/FontClasses.css", {
    flags: "w",
  });

  logger.write(CODEGEN_COMMENT);
  fontClasses.sort().forEach((fontClass) => {
    logger.write(`.${fontClass}Font {\n`);
    logger.write(`  font-family: var(--font-family-${fontClass});\n`);
    logger.write(`  font-size: var(--font-size-${fontClass});\n`);
    logger.write(`  font-weight: var(--font-weight-${fontClass});\n`);
    logger.write(`  letter-spacing: var(--letter-spacing-${fontClass});\n`);
    logger.write(`  line-height: var(--line-height-${fontClass});\n`);
    logger.write("}\n\n");

    if (fontClass.includes("body")) {
      // Font weights
      [
        ["500", "Medium"],
        ["600", "SemiBold"],
        ["700", "Bold"],
      ].forEach((fontWeight) => {
        logger.write(`.${fontClass}${fontWeight[1]}Font {\n`);
        logger.write(`  font-family: var(--font-family-${fontClass});\n`);
        logger.write(`  font-size: var(--font-size-${fontClass});\n`);
        logger.write(`  font-weight: ${fontWeight[0]};\n`);
        logger.write(`  letter-spacing: var(--letter-spacing-${fontClass});\n`);
        logger.write(`  line-height: var(--line-height-${fontClass});\n`);
        logger.write("}\n\n");
      });
    }
  });
}

//
// Enum codegen
//

function outputFontClassEnum(fontClasses) {
  const logger = fs.createWriteStream("src/types/enums/FontClass.ts", {
    flags: "w",
  });

  logger.write(CODEGEN_COMMENT);
  logger.write("enum FontClass {\n");

  fontClasses.sort().forEach((fontClass) => {
    logger.write(
      `  ${capitalizeFirstLetter(fontClass)} = "${fontClass}Font",\n`
    );

    if (fontClass.includes("body")) {
      ["Bold", "Medium", "SemiBold"].forEach((fontWeight) => {
        logger.write(
          `  ${capitalizeFirstLetter(
            fontClass
          )}${fontWeight} = "${fontClass}${fontWeight}Font",\n`
        );
      });
    }
  });

  logger.write("}\n\n");
  logger.write("export default FontClass;\n");
}

try {
  const fontClasses = getFontClasses();
  outputFontClasses(fontClasses);
  outputFontClassEnum(fontClasses);
} catch (err) {
  console.error(err);
}
