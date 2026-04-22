module.exports = [
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
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/content.js [ssr] (ecmascript)");
;
;
;
function HomePage({ concepts }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "page",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "page-title",
                    children: "Concepts"
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 8,
                    columnNumber: 9
                }, this),
                concepts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-block muted",
                    children: "No concepts found."
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 11,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                    className: "content-list content-list--plain",
                    children: concepts.map((concept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "item-title",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/concept/${concept.slug}`,
                                        children: concept.title || concept.slug
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 17,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 16,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "item-summary muted",
                                    children: concept.slug
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 21,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "item-summary",
                                    children: concept.summary || "No summary available."
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, concept.slug, true, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 15,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 13,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.js",
            lineNumber: 7,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/index.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
function getStaticProps() {
    return {
        props: {
            concepts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllConcepts"])()
        }
    };
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0p3dk87._.js.map