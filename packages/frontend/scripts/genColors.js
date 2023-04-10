const fs = require("fs");
const codegenComment = require("./codegenComment.js");

const CODEGEN_COMMENT = codegenComment("genColors.js");

//
// HELPERS
//

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseColorVariableLine(line) {
  const parts = line.trim().split(":");
  const colorName = parts[0].slice(8);
  const colorValueRaw = parts[1].trim();
  const colorValue = colorValueRaw.slice(0, colorValueRaw.indexOf(";"));
  return { colorName, colorNameRaw: parts[0].trim(), colorValue };
}

function parseColorVariableName(str) {
  const capitalizedName = capitalizeFirstLetter(str.split("-")[3]);
  return { capitalizedName };
}

function getColorMap() {
  const data = fs.readFileSync(
    "src/css/global/colors/ColorVariables.css",
    "utf8"
  );
  const lines = data.split("\n").filter((line) => line.includes("--color"));
  return Object.assign(
    {},
    ...lines.map((line) => {
      const { colorName, colorValue } = parseColorVariableLine(line);
      return { [colorName]: colorValue };
    })
  );
}

function getColorVariablesDarkMode() {
  const data = fs.readFileSync(
    "src/css/global/colors/ColorVariablesDarkMode.css",
    "utf8"
  );
  const lines = data.split("\n").filter((line) => line.includes("--color"));
  return lines.map((line) => parseColorVariableLine(line).colorNameRaw);
}

function getColorVariablesLightMode() {
  const data = fs.readFileSync(
    "src/css/global/colors/ColorVariablesLightMode.css",
    "utf8"
  );
  const lines = data.split("\n").filter((line) => line.includes("--color"));
  return lines.map((line) => parseColorVariableLine(line).colorNameRaw);
}

//
// CSS codegen
//

function outputColorClasses(colorMap) {
  const logger = fs.createWriteStream(
    "src/css/global/colors/ColorClasses.css",
    {
      flags: "w",
    }
  );

  logger.write(CODEGEN_COMMENT);
  Object.keys(colorMap).forEach((colorName) => {
    if (colorMap[colorName].includes("gradient")) {
      return;
    }

    logger.write(`.color${capitalizeFirstLetter(colorName)} {\n`);
    logger.write(`  color: var(--color-${colorName});\n`);
    logger.write("}\n\n");
  });
}

function outputBackgroundColorClasses(colorMap) {
  const logger = fs.createWriteStream(
    "src/css/global/colors/BackgroundColorClasses.css",
    {
      flags: "w",
    }
  );

  logger.write(CODEGEN_COMMENT);
  Object.keys(colorMap)
    .sort()
    .forEach((colorName) => {
      const cssProperty = colorMap[colorName].includes("gradient")
        ? "background"
        : "background-color";

      logger.write(`.backgroundColor${capitalizeFirstLetter(colorName)} {\n`);
      logger.write(`  ${cssProperty}: var(--color-${colorName});\n`);
      logger.write("}\n\n");
    });
}

//
// Enum codegen
//

function outputColorClassEnum(colorMap) {
  const logger = fs.createWriteStream("src/types/enums/ColorClass.ts", {
    flags: "w",
  });

  logger.write(CODEGEN_COMMENT);
  logger.write("enum ColorClass {\n");

  Object.keys(colorMap)
    .sort()
    .forEach((colorName) => {
      if (colorMap[colorName].includes("gradient")) {
        return;
      }

      logger.write(
        `  ${capitalizeFirstLetter(colorName)} = "color${capitalizeFirstLetter(
          colorName
        )}",\n`
      );
    });

  logger.write("}\n\n");
  logger.write("export default ColorClass;\n");
}

function outputBackgroundColorClassEnum(colorMap) {
  const logger = fs.createWriteStream(
    "src/types/enums/BackgroundColorClass.ts",
    {
      flags: "w",
    }
  );

  logger.write(CODEGEN_COMMENT);
  logger.write("enum BackgroundColorClass {\n");

  Object.keys(colorMap)
    .sort()
    .forEach((colorName) => {
      logger.write(
        `  ${capitalizeFirstLetter(
          colorName
        )} = "backgroundColor${capitalizeFirstLetter(colorName)}",\n`
      );
    });

  logger.write("}\n\n");
  logger.write("export default BackgroundColorClass;\n");
}

function outputColorValueEnum(colorMap) {
  const logger = fs.createWriteStream("src/types/enums/ColorValue.ts", {
    flags: "w",
  });

  logger.write(CODEGEN_COMMENT);
  logger.write("enum ColorValue {\n");

  Object.keys(colorMap)
    .sort()
    .forEach((colorName) => {
      if (colorMap[colorName].includes("gradient")) {
        return;
      }

      logger.write(
        `  ${capitalizeFirstLetter(colorName)} = "var(--color-${colorName})",\n`
      );
    });

  logger.write("}\n\n");
  logger.write("export default ColorValue;\n");
}

function outputColorVariableNameEnum(colorMap) {
  const logger = fs.createWriteStream("src/types/enums/ColorVariableName.ts", {
    flags: "w",
  });

  logger.write(CODEGEN_COMMENT);
  logger.write("enum ColorVariableName {\n");

  Object.keys(colorMap)
    .sort()
    .forEach((colorName) => {
      logger.write(
        `  ${capitalizeFirstLetter(colorName)} = "--color-${colorName}",\n`
      );
    });

  logger.write("}\n\n");
  logger.write("export default ColorVariableName;\n");
}

function outputColorVariableDarkModeNameEnum() {
  const logger = fs.createWriteStream(
    "src/types/enums/ColorVariableDarkModeName.ts",
    {
      flags: "w",
    }
  );

  logger.write(CODEGEN_COMMENT);
  logger.write("enum ColorVariableDarkModeName {\n");

  getColorVariablesDarkMode()
    .sort()
    .forEach((colorName) => {
      logger.write(
        `  ${
          parseColorVariableName(colorName).capitalizedName
        } = "${colorName}",\n`
      );
    });

  logger.write("}\n\n");
  logger.write("export default ColorVariableDarkModeName;\n");
}

function outputColorVariableLightModeNameEnum() {
  const logger = fs.createWriteStream(
    "src/types/enums/ColorVariableLightModeName.ts",
    {
      flags: "w",
    }
  );

  logger.write(CODEGEN_COMMENT);
  logger.write("enum ColorVariableLightModeName {\n");

  getColorVariablesLightMode()
    .sort()
    .forEach((colorName) => {
      logger.write(
        `  ${
          parseColorVariableName(colorName).capitalizedName
        } = "${colorName}",\n`
      );
    });

  logger.write("}\n\n");
  logger.write("export default ColorVariableLightModeName;\n");
}

function outputColorClassToColorValue(colorMap) {
  const logger = fs.createWriteStream(
    "src/utils/colors/ColorClassToColorValue.ts",
    {
      flags: "w",
    }
  );

  logger.write(CODEGEN_COMMENT);
  logger.write(`import ColorClass from "types/enums/ColorClass";\n`);
  logger.write(`import ColorValue from "types/enums/ColorValue";\n\n`);

  logger.write(
    "const COLOR_CLASS_TO_COLOR_VALUE: Record<ColorClass, ColorValue> = {\n"
  );

  Object.keys(colorMap).forEach((colorName) => {
    if (colorMap[colorName].includes("gradient")) {
      return;
    }

    logger.write(
      `  [ColorClass.${capitalizeFirstLetter(
        colorName
      )}]: ColorValue.${capitalizeFirstLetter(colorName)},\n`
    );
  });

  logger.write("};\n\n");
  logger.write("export default COLOR_CLASS_TO_COLOR_VALUE;\n");
}

try {
  const colorMap = getColorMap();

  outputColorClasses(colorMap);
  outputBackgroundColorClasses(colorMap);
  outputColorClassEnum(colorMap);
  outputBackgroundColorClassEnum(colorMap);
  outputColorValueEnum(colorMap);
  outputColorVariableNameEnum(colorMap);
  outputColorVariableDarkModeNameEnum(colorMap);
  outputColorVariableLightModeNameEnum(colorMap);
  outputColorClassToColorValue(colorMap);
} catch (err) {
  console.error(err);
}
