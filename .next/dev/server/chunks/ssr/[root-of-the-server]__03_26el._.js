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
        style: styles.page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: styles.container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    style: styles.title,
                    children: "Concepts"
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 8,
                    columnNumber: 9
                }, this),
                concepts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: styles.empty,
                    children: "No concepts found."
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 11,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                    style: styles.list,
                    children: concepts.map((concept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                            style: styles.item,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/concept/${concept.slug}`,
                                    style: styles.link,
                                    children: concept.title || concept.slug
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 16,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: styles.summary,
                                    children: concept.summary || ""
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 19,
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
const styles = {
    page: {
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif"
    },
    container: {
        maxWidth: "640px",
        margin: "0 auto"
    },
    title: {
        marginTop: 0,
        marginBottom: "24px"
    },
    list: {
        padding: 0,
        margin: 0,
        listStyle: "none"
    },
    item: {
        marginBottom: "20px"
    },
    link: {
        color: "#0f172a",
        fontWeight: "bold",
        textDecoration: "none"
    },
    summary: {
        marginTop: "6px",
        marginBottom: 0,
        lineHeight: 1.6
    },
    empty: {
        margin: 0
    }
};
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__03_26el._.js.map