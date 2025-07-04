#! /usr/bin/env node

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_JDK_PATH = "C:\\Program Files\\Java\\jdk17";
const DEFAULT_VERSION_NR = 1;

main().catch((e) => {
  console.error(e.message, "Hier ist die Hilfe (--help): ");
  console.error("");
  printHelp();
  process.exit(1);
});

async function main() {
  const [_, __, ...restArgs] = process.argv;
  const helpOption = restArgs.some((a) => a === "--help" || a === "-h");

  if (helpOption) {
    printHelp();
  } else {
    generateApiClient(restArgs);
  }
}

/**
 * Gebe das Manual aus
 */
function printHelp() {
  console.log("Generiere API Clients aus einer OpenAPI y[a]ml Datei");
  console.log("");
  console.log("Usage:");
  console.log(`  ${path.basename(process.argv[1])} <OPEN_API_SPEC_DATEI_PFAD>`);
  console.log("");
  console.log("Options:");
  console.log("  -h, --help\t\t\t\t Zeige diese Hilfe an");
  console.log("");
  console.log("Es sollte jdk17 installiert und unter $JDK_HOME gesetzt sein.");
  console.log("Falls $JDK_HOME nicht gesetzt ist, fallen wir auf");
  console.log("'/C/Program Files/Java/jdk17' zurück.");
}

/**
 * Generiere einen API Client aus einer OpenAPI Spec
 *
 * @param {string[]} args - die Argumente bereinigt um die Pfade zu node und dem
 *  Skript.
 */
function generateApiClient(args) {
  const specFile = getSpecFilePath(args);
  const jdkPath = process.env.JDK_HOME ?? DEFAULT_JDK_PATH;
  const specFilePath = path.resolve(specFile);
  const specFileName = path.basename(path.basename(specFile, ".yml"), ".yaml");
  const versionNr = getVersionNr(specFilePath);
  const lowerCaseModuleName = specFileName
    .replace("-openapi", "")
    .replace("service", "")
    .toLocaleLowerCase();
  const outputDir = path.resolve(
    __dirname,
    `../src/api/${lowerCaseModuleName}/v${versionNr}`,
  );

  fs.rmSync(outputDir, { force: true, recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const generatorJarPath =
    "C:\\Users\\DonTillo\\.m2\\repository\\org\\openapitools\\openapi-generator\\7.8.0\\openapi-generator-cli-7.8.0.jar";
  const PascalCaseModuleName =
    lowerCaseModuleName[0].toLocaleUpperCase() + lowerCaseModuleName.slice(1);
  const generatorParams = `apiModulePrefix=${PascalCaseModuleName},configurationPrefix=${PascalCaseModuleName},fileNaming=kebab-case,generateAliasAsModel=true`;

  execSync(
    `"${jdkPath}"\\bin\\java -jar ${generatorJarPath} generate -g typescript-angular -o "${outputDir}" -i "${specFilePath}" -p "${generatorParams}"`,
    { stdio: "inherit" },
  );
}

/**
 * @param {string[]} args - die Argumente für dieses Skript (ohne node oder
 *  script Pfad)
 *
 * @returns {string} - der Pfad zur Spec File
 */
function getSpecFilePath(args) {
  if (args.length !== 1) {
    throw new Error("Ungültige Anzahl an Optionen.");
  }

  return args[0];
}

/**
 * @param {string} specFilePath
 *
 * @returns {number} - the version of the spec file. Minimum of 1.
 */
function getVersionNr(specFilePath) {
  const data = fs.readFileSync(specFilePath, "utf8");
  const line = data
    .split("\n")
    .find((line) => line.match(/version: /))
    .trim();

  if (!line) {
    return DEFAULT_VERSION_NR;
  }

  const majorVersionNr = line.split("version:").at(-1).trim().split(".")[0];
  const versionNr = majorVersionNr.match(/^\d+$/)
    ? Number.parseInt(majorVersionNr)
    : DEFAULT_VERSION_NR;

  return Math.max(1, versionNr);
}
