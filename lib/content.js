const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const contentDirectory = path.join(process.cwd(), "content");
const conceptsDirectory = path.join(contentDirectory, "concepts");
const relationsDirectory = path.join(contentDirectory, "relations");
const domainsDirectory = path.join(contentDirectory, "domains");
const logsDirectory = path.join(contentDirectory, "logs");

function isYamlFile(fileName) {
  return fileName.endsWith(".yaml") || fileName.endsWith(".yml");
}

function getSlugFromFileName(fileName) {
  return fileName.replace(/\.ya?ml$/, "");
}

function toPlainObject(data, fallbackSlug) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return null;
  }

  return JSON.parse(
    JSON.stringify({
      slug: data.slug || fallbackSlug,
      ...data
    })
  );
}

function readYamlFile(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents);
    return toPlainObject(data, getSlugFromFileName(fileName));
  } catch (error) {
    return null;
  }
}

function readYamlDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  return fs
    .readdirSync(directoryPath)
    .filter((fileName) => isYamlFile(fileName))
    .map((fileName) => readYamlFile(directoryPath, fileName))
    .filter(Boolean)
    .sort((firstItem, secondItem) =>
      firstItem.slug.localeCompare(secondItem.slug)
    );
}

function getFileBySlug(directoryPath, slug) {
  const yamlFilePath = path.join(directoryPath, `${slug}.yaml`);
  const ymlFilePath = path.join(directoryPath, `${slug}.yml`);

  if (fs.existsSync(yamlFilePath)) {
    return readYamlFile(directoryPath, `${slug}.yaml`);
  }

  if (fs.existsSync(ymlFilePath)) {
    return readYamlFile(directoryPath, `${slug}.yml`);
  }

  return null;
}

function getAllConcepts() {
  return readYamlDirectory(conceptsDirectory);
}

function getConceptBySlug(slug) {
  if (!slug) {
    return null;
  }

  return getFileBySlug(conceptsDirectory, slug);
}

function getAllRelations() {
  return readYamlDirectory(relationsDirectory);
}

function getAllDomains() {
  return readYamlDirectory(domainsDirectory);
}

function getAllLogs() {
  return readYamlDirectory(logsDirectory);
}

function getAllContent() {
  return [
    ...getAllConcepts(),
    ...getAllRelations(),
    ...getAllDomains(),
    ...getAllLogs()
  ];
}

module.exports = {
  getAllConcepts,
  getConceptBySlug,
  getAllRelations,
  getAllDomains,
  getAllLogs,
  getAllContent
};
