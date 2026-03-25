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
"[project]/Desktop/Upload/Trashverse/web/utils/nigeriaData.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nigeriaData",
    ()=>nigeriaData
]);
const nigeriaData = {
    Enugu: [
        "Enugu East",
        "Enugu West",
        "Enugu North",
        "Nsukka",
        "Udi",
        "Oji River",
        "Igbo Etiti",
        "Igbo Eze North",
        "Igbo Eze South"
    ],
    Lagos: [
        "Ikeja",
        "Surulere",
        "Yaba",
        "Ikorodu",
        "Epe",
        "Lekki"
    ],
    Abuja: [
        "Gwagwalada",
        "Kuje",
        "Abaji",
        "Bwari",
        "Kwali"
    ],
    Abia: [
        "Aba North",
        "Aba South",
        "Umuahia North",
        "Umuahia South",
        "Isiala Ngwa North",
        "Isiala Ngwa South",
        "Obingwa",
        "Ukwa East",
        "Ukwa West",
        "Ikwuano",
        "Ohafia",
        "Arochukwu",
        "Bende",
        "Osisioma Ngwa",
        "Ugwunagbo",
        "Isuikwuato",
        "Umunneochi"
    ]
};
}),
"[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Signup
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
// pages/sign-up.jsx
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Upload/Trashverse/web/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$utils$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Upload/Trashverse/web/utils/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Upload/Trashverse/web/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Desktop/Upload/Trashverse/web/node_modules/lucide-react/dist/esm/icons/eye.js [ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/Desktop/Upload/Trashverse/web/node_modules/lucide-react/dist/esm/icons/eye-off.js [ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$utils$2f$nigeriaData$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Upload/Trashverse/web/utils/nigeriaData.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$react$2d$hot$2d$toast$29$__ = __turbopack_context__.i("[externals]/react-hot-toast [external] (react-hot-toast, esm_import, [project]/Desktop/Upload/Trashverse/web/node_modules/react-hot-toast)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$react$2d$hot$2d$toast$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$react$2d$hot$2d$toast$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function Signup() {
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        name: "",
        phone: "",
        email: "",
        state: "",
        lga: "",
        address: "",
        password: "",
        confirmPassword: "",
        photo: null
    });
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showConfirmPassword, setShowConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleChange = (e)=>{
        const { name, value, files } = e.target;
        if (name === "photo") {
            setForm({
                ...form,
                photo: files[0]
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };
    const getPasswordStrength = (password)=>{
        if (!password) return "";
        if (password.length < 6) return "Weak";
        if (password.length < 10) return "Medium";
        if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*])/)) return "Strong";
        return "Strong";
    };
    const strength = getPasswordStrength(form.password);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handleSignup = async (e)=>{
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$react$2d$hot$2d$toast$29$__["default"].error("Passwords do not match");
        }
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach((key)=>{
                formData.append(key, form[key]);
            });
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$utils$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["BASE_URL"]}/api/signup`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (!res.ok) __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$react$2d$hot$2d$toast$29$__["default"].error("Signup failed! Please check your details and try again.");
            if (data.token) {
                localStorage.setItem("trashverse_token", data.token);
            }
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$react$2d$hot$2d$toast$29$__["default"].success("Signup successful!");
            router.push("/dashboard");
        } catch (err) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$2c$__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$react$2d$hot$2d$toast$29$__["default"].error("An error occurred. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-green-900 text-white flex-col justify-center items-center p-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "TrashVerse"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-lg opacity-80 text-center max-w-sm",
                        children: "Smart waste management for a cleaner, greener future 🌱"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "w-full md:w-1/2 flex justify-center items-center bg-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md sm:p-10 border border-gray-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-green-600 text-center mb-6",
                            children: "Create an Account"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleSignup,
                            className: "flex flex-col gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-green-500 transition",
                                                children: form.photo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: URL.createObjectURL(form.photo),
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                    lineNumber: 107,
                                                    columnNumber: 11
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500 text-center px-2",
                                                    children: "Upload Photo"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                    lineNumber: 112,
                                                    columnNumber: 11
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                lineNumber: 105,
                                                columnNumber: 7
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                name: "photo",
                                                accept: "image/*",
                                                onChange: handleChange,
                                                className: "hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                lineNumber: 117,
                                                columnNumber: 7
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                        lineNumber: 104,
                                        columnNumber: 5
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 103,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    name: "name",
                                    placeholder: "Name",
                                    onChange: handleChange,
                                    className: "input",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 128,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    name: "phone",
                                    placeholder: "Phone Number",
                                    onChange: handleChange,
                                    className: "input",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 137,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    name: "email",
                                    placeholder: "Email Address",
                                    onChange: handleChange,
                                    className: "input",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 146,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                    name: "state",
                                    value: form.state,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            state: e.target.value,
                                            lga: ""
                                        }),
                                    className: "input",
                                    required: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select State"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                            lineNumber: 165,
                                            columnNumber: 5
                                        }, this),
                                        Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$utils$2f$nigeriaData$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["nigeriaData"]).map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: state,
                                                children: state
                                            }, state, false, {
                                                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                lineNumber: 167,
                                                columnNumber: 7
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 156,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                    name: "lga",
                                    value: form.lga,
                                    onChange: handleChange,
                                    className: "input",
                                    required: true,
                                    disabled: !form.state,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select LGA"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                            lineNumber: 182,
                                            columnNumber: 5
                                        }, this),
                                        form.state && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$utils$2f$nigeriaData$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["nigeriaData"][form.state].map((lga)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: lga,
                                                children: lga
                                            }, lga, false, {
                                                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                lineNumber: 185,
                                                columnNumber: 9
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 174,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                    name: "address",
                                    placeholder: "Address",
                                    onChange: handleChange,
                                    className: "input",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 192,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("divpass", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: showPassword ? "text" : "password",
                                            name: "password",
                                            placeholder: "Create Password",
                                            onChange: handleChange,
                                            className: "input pr-12",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                            lineNumber: 202,
                                            columnNumber: 5
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowPassword(!showPassword),
                                            className: "absolute right-20 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-green-600 transition",
                                            children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                lineNumber: 215,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                lineNumber: 215,
                                                columnNumber: 46
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                            lineNumber: 210,
                                            columnNumber: 5
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 201,
                                    columnNumber: 3
                                }, this),
                                form.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("pstr", {
                                    className: `text-sm ${strength === "Weak" ? "text-red-500" : strength === "Medium" ? "text-yellow-500" : "text-green-600"}`,
                                    children: [
                                        "Password strength: ",
                                        strength
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 219,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("divpass", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: showConfirmPassword ? "text" : "password",
                                            onClick: ()=>setShowConfirmPassword(!showConfirmPassword),
                                            name: "confirmPassword",
                                            placeholder: "Confirm Password",
                                            onChange: handleChange,
                                            className: "input pr-12",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                            lineNumber: 234,
                                            columnNumber: 5
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowConfirmPassword(!showConfirmPassword),
                                            className: "absolute right-20 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-green-600 transition",
                                            children: showConfirmPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                lineNumber: 248,
                                                columnNumber: 30
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                                lineNumber: 248,
                                                columnNumber: 53
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                            lineNumber: 243,
                                            columnNumber: 5
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 233,
                                    columnNumber: 3
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("divpass", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        disabled: loading,
                                        className: "bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition w-80 h-10 flex justify-center items-center",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                            lineNumber: 258,
                                            columnNumber: 5
                                        }, this) : "Create Account"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                        lineNumber: 253,
                                        columnNumber: 1
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 251,
                                    columnNumber: 3
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                            lineNumber: 100,
                            columnNumber: 1
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-center mt-2 text-gray-500 mb-2",
                            children: [
                                "Already have an account?",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Upload$2f$Trashverse$2f$web$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "text-green-600",
                                    children: "Login"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Upload/Trashverse/web/pages/signup.jsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a260f9e._.js.map