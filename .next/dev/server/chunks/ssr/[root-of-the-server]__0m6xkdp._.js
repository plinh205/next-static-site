module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/lib/content.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const yaml = __turbopack_context__.r("[externals]/js-yaml [external] (js-yaml, cjs, [project]/node_modules/js-yaml)");
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
    return JSON.parse(JSON.stringify({
        slug: data.slug || fallbackSlug,
        ...data
    }));
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
    return fs.readdirSync(directoryPath).filter((fileName)=>isYamlFile(fileName)).map((fileName)=>readYamlFile(directoryPath, fileName)).filter(Boolean).sort((firstItem, secondItem)=>firstItem.slug.localeCompare(secondItem.slug));
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
}),
"[project]/pages/concept/[slug].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConceptPage,
    "getStaticPaths",
    ()=>getStaticPaths,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/content.js [ssr] (ecmascript)");
;
;
;
function ConceptPage({ concept, relatedRelations, relatedLogs }) {
    const compareItems = Array.isArray(concept.compare) ? concept.compare : [];
    const coreMechanismItems = Array.isArray(concept.core_mechanism) ? concept.core_mechanism : [];
    const whenToUseItems = Array.isArray(concept.when_to_use) ? concept.when_to_use : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        style: styles.page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: styles.container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    style: styles.backLink,
                    children: "Back to home"
                }, void 0, false, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    style: styles.title,
                    children: concept.title || concept.slug || "Concept"
                }, void 0, false, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: styles.summary,
                    children: concept.summary || "No summary available."
                }, void 0, false, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    style: styles.section,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: styles.heading,
                            children: "Mental model"
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: styles.text,
                            children: concept.mental_model || "No mental model available."
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    style: styles.section,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: styles.heading,
                            children: "Core mechanism"
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        coreMechanismItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: styles.text,
                            children: "No core mechanism details available."
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            style: styles.list,
                            children: coreMechanismItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    style: styles.listItem,
                                    children: item
                                }, `${item}-${index}`, false, {
                                    fileName: "[project]/pages/concept/[slug].js",
                                    lineNumber: 48,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    style: styles.section,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: styles.heading,
                            children: "When to use"
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        whenToUseItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: styles.text,
                            children: "No usage notes available."
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            style: styles.list,
                            children: whenToUseItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    style: styles.listItem,
                                    children: item
                                }, `${item}-${index}`, false, {
                                    fileName: "[project]/pages/concept/[slug].js",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    style: styles.section,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: styles.heading,
                            children: "Compare"
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        compareItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: styles.text,
                            children: "No comparison notes available."
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            style: styles.list,
                            children: compareItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    style: styles.compareItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                            children: item.target || "Unknown target"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/concept/[slug].js",
                                            lineNumber: 82,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            style: styles.compareText,
                                            children: item.difference || "No difference provided."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/concept/[slug].js",
                                            lineNumber: 83,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, `${item.target || "compare"}-${index}`, true, {
                                    fileName: "[project]/pages/concept/[slug].js",
                                    lineNumber: 78,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    style: styles.section,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: styles.heading,
                            children: "Related concepts"
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        relatedRelations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: styles.text,
                            children: "No related concepts found."
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            style: styles.list,
                            children: relatedRelations.map((relation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    style: styles.listItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: styles.relationType,
                                            children: [
                                                relation.relationType || "related-to",
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/concept/[slug].js",
                                            lineNumber: 103,
                                            columnNumber: 19
                                        }, this),
                                        " ",
                                        relation.targetConcept ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/concept/${relation.targetConcept}`,
                                            style: styles.inlineLink,
                                            children: relation.targetConcept
                                        }, void 0, false, {
                                            fileName: "[project]/pages/concept/[slug].js",
                                            lineNumber: 107,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "Unknown concept"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/concept/[slug].js",
                                            lineNumber: 114,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, `${relation.targetConcept || "related"}-${index}`, true, {
                                    fileName: "[project]/pages/concept/[slug].js",
                                    lineNumber: 99,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    style: styles.section,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: styles.heading,
                            children: "Learning logs"
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this),
                        relatedLogs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: "No learning logs found."
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            children: relatedLogs.map((log, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: log.topic || "Untitled log"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/concept/[slug].js",
                                                lineNumber: 131,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/concept/[slug].js",
                                            lineNumber: 130,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            children: log.trigger || "No trigger provided."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/concept/[slug].js",
                                            lineNumber: 133,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            children: log.updated_model || "No updated model provided."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/concept/[slug].js",
                                            lineNumber: 134,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, `${log.topic || "log"}-${index}`, true, {
                                    fileName: "[project]/pages/concept/[slug].js",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/concept/[slug].js",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/concept/[slug].js",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/concept/[slug].js",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/concept/[slug].js",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function getStaticPaths() {
    const concepts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllConcepts"])();
    return {
        paths: concepts.map((concept)=>({
                params: {
                    slug: concept.slug
                }
            })),
        fallback: false
    };
}
function getStaticProps({ params }) {
    const concept = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getConceptBySlug"])(params.slug);
    const relatedRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllRelations"])().filter((relation)=>relation.from === params.slug || relation.to === params.slug).map((relation)=>({
            relationType: relation.relation_type,
            targetConcept: relation.from === params.slug ? relation.to : relation.from
        }));
    const relatedLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllLogs"])().filter((log)=>{
        if (!Array.isArray(log.related_concepts)) {
            return false;
        }
        return log.related_concepts.includes(params.slug);
    });
    if (!concept) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            concept,
            relatedRelations,
            relatedLogs
        }
    };
}
const styles = {
    page: {
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif"
    },
    container: {
        maxWidth: "680px",
        margin: "0 auto"
    },
    backLink: {
        display: "inline-block",
        marginBottom: "24px",
        color: "#2563eb",
        textDecoration: "none"
    },
    title: {
        marginTop: 0,
        marginBottom: "12px"
    },
    summary: {
        marginTop: 0,
        marginBottom: "24px",
        lineHeight: 1.6
    },
    section: {
        marginBottom: "28px"
    },
    heading: {
        marginTop: 0,
        marginBottom: "12px"
    },
    text: {
        margin: 0,
        lineHeight: 1.6
    },
    list: {
        margin: 0,
        paddingLeft: "20px"
    },
    listItem: {
        marginBottom: "8px",
        lineHeight: 1.6
    },
    relationType: {
        fontWeight: "bold"
    },
    inlineLink: {
        color: "#2563eb",
        textDecoration: "none"
    },
    compareItem: {
        marginBottom: "12px",
        lineHeight: 1.6
    },
    compareText: {
        marginTop: "4px",
        marginBottom: 0
    }
};
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0m6xkdp._.js.map