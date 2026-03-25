module.exports = [
"[project]/Desktop/Upload/Trashverse/web/utils/api.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// utils/api.js
__turbopack_context__.s([
    "BASE_URL",
    ()=>BASE_URL,
    "getAuthHeader",
    ()=>getAuthHeader
]);
const BASE_URL = "https://trashverse.onrender.com"; // your Render backend
const getAuthHeader = ()=>{
    const token = localStorage.getItem("trashverse_token");
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
};
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx'\n\nExpected 'from', got 'export'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__dd020bc0._.js.map