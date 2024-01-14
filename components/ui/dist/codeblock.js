// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx
'use client';
"use strict";
exports.__esModule = true;
exports.CodeBlock = exports.generateRandomString = exports.programmingLanguages = void 0;
var react_1 = require("react");
var react_syntax_highlighter_1 = require("react-syntax-highlighter");
var prism_1 = require("react-syntax-highlighter/dist/cjs/styles/prism");
var use_copy_to_clipboard_1 = require("@/lib/hooks/use-copy-to-clipboard");
var icons_1 = require("@/components/ui/icons");
var button_1 = require("@/components/ui/button");
exports.programmingLanguages = {
    javascript: '.js',
    python: '.py',
    java: '.java',
    c: '.c',
    cpp: '.cpp',
    'c++': '.cpp',
    'c#': '.cs',
    ruby: '.rb',
    php: '.php',
    swift: '.swift',
    'objective-c': '.m',
    kotlin: '.kt',
    typescript: '.ts',
    go: '.go',
    perl: '.pl',
    rust: '.rs',
    scala: '.scala',
    haskell: '.hs',
    lua: '.lua',
    shell: '.sh',
    sql: '.sql',
    html: '.html',
    css: '.css'
    // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};
exports.generateRandomString = function (length, lowercase) {
    if (lowercase === void 0) { lowercase = false; }
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return lowercase ? result.toLowerCase() : result;
};
var CodeBlock = react_1.memo(function (_a) {
    var language = _a.language, value = _a.value;
    var _b = use_copy_to_clipboard_1.useCopyToClipboard({ timeout: 2000 }), isCopied = _b.isCopied, copyToClipboard = _b.copyToClipboard;
    var downloadAsFile = function () {
        if (typeof window === 'undefined') {
            return;
        }
        var fileExtension = exports.programmingLanguages[language] || '.file';
        var suggestedFileName = "file-" + exports.generateRandomString(3, true) + fileExtension;
        var fileName = window.prompt('Enter file name' || '', suggestedFileName);
        if (!fileName) {
            // User pressed cancel on prompt.
            return;
        }
        var blob = new Blob([value], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    var onCopy = function () {
        if (isCopied)
            return;
        copyToClipboard(value);
    };
    return (React.createElement("div", { className: "relative w-full font-sans codeblock bg-zinc-950" },
        React.createElement("div", { className: "flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100" },
            React.createElement("span", { className: "text-xs lowercase" }, language),
            React.createElement("div", { className: "flex items-center space-x-1" },
                React.createElement(button_1.Button, { variant: "ghost", className: "hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0", onClick: downloadAsFile, size: "icon" },
                    React.createElement(icons_1.IconDownload, null),
                    React.createElement("span", { className: "sr-only" }, "Download")),
                React.createElement(button_1.Button, { variant: "ghost", size: "icon", className: "text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0", onClick: onCopy },
                    isCopied ? React.createElement(icons_1.IconCheck, null) : React.createElement(icons_1.IconCopy, null),
                    React.createElement("span", { className: "sr-only" }, "Copy code")))),
        React.createElement(react_syntax_highlighter_1.Prism, { language: language, style: prism_1.coldarkDark, PreTag: "div", showLineNumbers: true, customStyle: {
                margin: 0,
                width: '100%',
                background: 'transparent',
                padding: '1.5rem 1rem'
            }, lineNumberStyle: {
                userSelect: "none"
            }, codeTagProps: {
                style: {
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)'
                }
            } }, value)));
});
exports.CodeBlock = CodeBlock;
CodeBlock.displayName = 'CodeBlock';
