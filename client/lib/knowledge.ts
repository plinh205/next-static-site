import { mockConcepts, type Concept } from "./mockData";

export interface ConceptCompareRow {
  target: string;
  difference: string;
}

export interface ConceptDisplayData {
  title: string;
  summary: string;
  mentalModel: string;
  coreMechanism: string[];
  whenToUse: string[];
  compare: ConceptCompareRow[];
}

export interface DomainTreeItem {
  id: string;
  name: string;
  slug: string;
  children: [];
}

export interface DomainTreeGroup {
  id: string;
  name: string;
  children: DomainTreeNode[];
}

export type DomainTreeNode = DomainTreeGroup | DomainTreeItem;

function getDomainPath(concept: Concept) {
  if (concept.breadcrumb?.length) {
    return concept.breadcrumb;
  }

  return (concept.domain || "")
    .split(">")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function getConceptNavigationTitle(concept: Pick<Concept, "title">) {
  return (concept.title || "Untitled concept").replace(/\s*\([^)]*\)\s*$/, "");
}

function getStringList(value?: string[]) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
}

export function getConceptDisplayData(concept: Concept): ConceptDisplayData {
  const newCoreMechanism = getStringList(concept.core_mechanism);
  const legacyCoreMechanism = getStringList(concept.mechanism);
  const newWhenToUse = getStringList(concept.when_to_use);
  const legacyWhenToUse = getStringList(concept.whenToUse);
  const coreMechanism =
    newCoreMechanism.length > 0 ? newCoreMechanism : legacyCoreMechanism;
  const whenToUse = newWhenToUse.length > 0 ? newWhenToUse : legacyWhenToUse;
  const compareRows = Array.isArray(concept.compare)
    ? concept.compare
        .map((row) => ({
          target: row.target || row.concept || "",
          difference: row.difference || "",
        }))
        .filter((row) => row.target || row.difference)
        .map((row) => ({
          target: row.target || "Unknown target",
          difference: row.difference || "No difference provided.",
        }))
    : [];

  return {
    title: concept.title || "Untitled concept",
    summary:
      concept.summary ||
      concept.definition ||
      "No summary available for this concept yet.",
    mentalModel:
      concept.mental_model ||
      concept.mentalModel ||
      "No mental model has been added yet.",
    coreMechanism,
    whenToUse,
    compare: compareRows,
  };
}

export function getAllConcepts() {
  return mockConcepts;
}

export function getConceptBySlug(slug?: string) {
  return mockConcepts.find((concept) => concept.slug === slug);
}

export function getConceptTitleBySlug(slug: string) {
  const concept = getConceptBySlug(slug);

  if (!concept) {
    return slug;
  }

  return getConceptNavigationTitle(concept);
}

function sortDomainTree(nodes: DomainTreeNode[]) {
  return [...nodes]
    .sort((firstNode, secondNode) => firstNode.name.localeCompare(secondNode.name))
    .map((node) => {
      if (!node.children.length) {
        return node;
      }

      return {
        ...node,
        children: sortDomainTree(node.children),
      };
    });
}

export async function fetchConcepts(): Promise<Concept[]> {
  const res = await fetch('/api/concepts');
  const json = await res.json();
  return json.concepts as Concept[];
}

export function getDomainTree(concepts: Concept[] = mockConcepts) {
  const tree: DomainTreeNode[] = [];

  concepts.forEach((concept) => {
    const path = getDomainPath(concept);
    const segments = path.length > 0 ? path : ["General"];
    let currentLevel = tree;
    let currentPath = "";

    segments.forEach((segment) => {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;

      let existingNode = currentLevel.find(
        (node) => !("slug" in node) && node.name === segment,
      ) as DomainTreeGroup | undefined;

      if (!existingNode) {
        existingNode = {
          id: `group:${currentPath}`,
          name: segment,
          children: [],
        };
        currentLevel.push(existingNode);
      }

      currentLevel = existingNode.children;
    });

    currentLevel.push({
      id: `concept:${concept.slug}`,
      name: getConceptNavigationTitle(concept),
      slug: concept.slug,
      children: [],
    });
  });

  return sortDomainTree(tree);
}
