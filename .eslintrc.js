// cspell:words setstate, eqeqeq, iife, backreference, isnan, nonoctal, textnodes, nonconstructor
/* eslint-env node */
/*
    Rules in this file are in the same order as they appear in the docs sites to make it easy to find. (Usually this is alphabetical but sometimes there's subgroups.)
    ESLint Rule Documentation Sites:
        https://eslint.org/docs/latest/rules/
        https://github.com/jsx-eslint/eslint-plugin-react
        https://github.com/import-js/eslint-plugin-import
        https://github.com/testing-library/eslint-plugin-testing-library
        https://github.com/jest-community/eslint-plugin-jest
        https://typescript-eslint.io/rules/
        https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
*/

const baseRestrictedImports = {
    patterns: [
        {
            group: ["../*"],
            message: "Usage of relative parent imports is not allowed.",
        },
    ],
    paths: [
        {
            name: ".",
            message: "Usage of local index imports is not allowed.",
        },
        {
            name: "./index",
            message: "Import from the source file instead.",
        },
    ],
}

module.exports = {
    root: true,
    plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "jest", "testing-library", "import"],
    env: {
        amd: true,
        es2022: true,
        browser: true,
        node: true,
    },
    reportUnusedDisableDirectives: true,
    parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true,
            impliedStrict: true,
        },
        sourceType: "module",
        requireConfigFile: false,
    },
    settings: {
        react: {
            pragma: "React",
            version: "detect",
        },
    },
    overrides: [
        {
            parser: "@typescript-eslint/parser",
            parserOptions: {
                sourceType: "module",
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            },
            files: ["*.ts", "*.tsx"],
            rules: {
                // TypeScript ESLint Core Disables - https://typescript-eslint.io/docs/linting/configs#eslint-recommended
                "constructor-super": "off",
                "getter-return": "off",
                "no-const-assign": "off",
                "no-dupe-args": "off",
                "no-dupe-class-members": "off",
                "no-dupe-keys": "off",
                "no-func-assign": "off",
                "no-import-assign": "off",
                "no-new-native-nonconstructor": "off",
                "no-obj-calls": "off",
                "no-setter-return": "off",
                "no-this-before-super": "off",
                "no-undef": "off",
                "no-unreachable": "off",
                "no-unsafe-negation": "off",
                "valid-typeof": "off",
                // TypeScript - https://typescript-eslint.io/rules/
                "@typescript-eslint/adjacent-overload-signatures": "error",
                "@typescript-eslint/array-type": "warn",
                "@typescript-eslint/await-thenable": "error",
                "@typescript-eslint/ban-ts-comment": "error",
                "@typescript-eslint/ban-types": "error",
                "@typescript-eslint/consistent-generic-constructors": ["warn", "constructor"],
                "@typescript-eslint/consistent-type-assertions": [
                    "warn",
                    {
                        assertionStyle: "as",
                        objectLiteralTypeAssertions: "allow-as-parameter",
                    },
                ],
                "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
                "@typescript-eslint/consistent-type-imports": "warn",
                "@typescript-eslint/explicit-function-return-type": [
                    "off",
                    {
                        allowTypedFunctionExpressions: true,
                    },
                ],
                "@typescript-eslint/explicit-member-accessibility": "off",
                "@typescript-eslint/explicit-module-boundary-types": "error",
                "@typescript-eslint/member-delimiter-style": "warn",
                "@typescript-eslint/method-signature-style": "warn",
                "@typescript-eslint/naming-convention": [
                    "warn",
                    {
                        selector: [
                            "classProperty",
                            "objectLiteralProperty",
                            "typeProperty",
                            "classMethod",
                            "objectLiteralMethod",
                            "typeMethod",
                            "accessor",
                            "enumMember",
                        ],
                        format: null,
                        modifiers: ["requiresQuotes"],
                    },
                    {
                        selector: "default",
                        format: ["camelCase"],
                    },
                    {
                        selector: ["function", "method", "enumMember", "property"],
                        format: ["camelCase", "PascalCase"],
                    },
                    {
                        selector: "variable",
                        modifiers: ["const"],
                        format: ["camelCase", "PascalCase", "UPPER_CASE"],
                    },
                    {
                        selector: "typeLike",
                        format: ["PascalCase"],
                    },
                    {
                        selector: "typeProperty",
                        format: ["camelCase", "PascalCase", "UPPER_CASE"],
                    },
                ],
                "@typescript-eslint/no-base-to-string": "error",
                "@typescript-eslint/no-confusing-non-null-assertion": "error",
                "@typescript-eslint/no-confusing-void-expression": "error",
                "@typescript-eslint/no-empty-interface": "warn",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-extra-non-null-assertion": "error",
                "@typescript-eslint/no-extraneous-class": "error",
                "@typescript-eslint/no-floating-promises": "error",
                "@typescript-eslint/no-for-in-array": "error",
                "@typescript-eslint/no-inferrable-types": "off",
                "@typescript-eslint/no-invalid-void-type": "error",
                "@typescript-eslint/no-misused-new": "error",
                "@typescript-eslint/no-misused-promises": "error",
                "@typescript-eslint/no-namespace": "warn",
                "@typescript-eslint/no-redundant-type-constituents": "warn",
                "@typescript-eslint/no-require-imports": "off",
                "@typescript-eslint/no-this-alias": "warn",
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
                "@typescript-eslint/no-unnecessary-condition": "warn",
                "@typescript-eslint/no-unnecessary-qualifier": "warn",
                "@typescript-eslint/no-unnecessary-type-assertion": "error",
                "@typescript-eslint/no-unnecessary-type-constraint": "warn",
                "@typescript-eslint/no-unsafe-argument": "error",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-call": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
                "@typescript-eslint/no-unsafe-return": "error",
                "@typescript-eslint/no-useless-empty-export": "warn",
                "@typescript-eslint/no-var-requires": "off",
                "@typescript-eslint/non-nullable-type-assertion-style": "warn",
                "@typescript-eslint/parameter-properties": "error",
                "@typescript-eslint/prefer-as-const": "warn",
                "@typescript-eslint/prefer-for-of": "warn",
                "@typescript-eslint/prefer-namespace-keyword": "warn",
                "@typescript-eslint/prefer-nullish-coalescing": [
                    "off",
                    {
                        ignoreTernaryTests: false,
                    },
                ],
                "@typescript-eslint/prefer-optional-chain": "warn",
                "@typescript-eslint/prefer-readonly": "warn",
                "@typescript-eslint/prefer-return-this-type": "error",
                "@typescript-eslint/prefer-string-starts-ends-with": "warn",
                "@typescript-eslint/prefer-ts-expect-error": "warn",
                "@typescript-eslint/require-array-sort-compare": "error",
                "@typescript-eslint/restrict-plus-operands": "error",
                "@typescript-eslint/restrict-template-expressions": "error",
                "@typescript-eslint/strict-boolean-expressions": [
                    "off",
                    {
                        allowString: false,
                        allowNumber: false,
                        allowNullableObject: false,
                    },
                ],
                "@typescript-eslint/triple-slash-reference": "warn",
                "@typescript-eslint/unified-signatures": "warn",
                // TypeScript Extension Rules - https://typescript-eslint.io/rules/#extension-rules
                "default-param-last": "off",
                "@typescript-eslint/default-param-last": "error",
                "no-array-constructor": "off",
                "@typescript-eslint/no-array-constructor": "error",
                "no-empty-function": "off",
                "@typescript-eslint/no-empty-function": "warn",
                "no-implied-eval": "off",
                "@typescript-eslint/no-implied-eval": "error",
                "no-invalid-this": "off",
                "@typescript-eslint/no-invalid-this": "error",
                "no-loss-of-precision": "off",
                "@typescript-eslint/no-loss-of-precision": "error",
                "no-redeclare": "off",
                "@typescript-eslint/no-redeclare": [
                    "error",
                    {
                        ignoreDeclarationMerge: false,
                    },
                ],
                "no-shadow": "off",
                "@typescript-eslint/no-shadow": [
                    "error",
                    {
                        ignoreOnInitialization: true,
                    },
                ],
                "no-throw-literal": "off",
                "@typescript-eslint/no-throw-literal": [
                    "error",
                    {
                        allowThrowingAny: false,
                        allowThrowingUnknown: false,
                    },
                ],
                "no-unused-expressions": "off",
                "@typescript-eslint/no-unused-expressions": "warn",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": "warn",
                "require-await": "off",
                "@typescript-eslint/require-await": "error",
            },
        },
        {
            // JSX A11y - This plugin is being extended because there's an extensive amount of custom options automatically configured. - https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
            extends: [
                "plugin:jsx-a11y/recommended",
                "plugin:react/recommended",
                "eslint:recommended",
            ],
            files: ["*.jsx", "*.tsx"],
            rules: {
                // React - https://github.com/jsx-eslint/eslint-plugin-react#list-of-supported-rules
                "react/function-component-definition": [
                    "off",
                    {
                        unnamedComponents: "arrow-function",
                    },
                ],
                "react/hook-use-state": "warn",
                "react/iframe-missing-sandbox": "warn",
                "react/no-access-state-in-setstate": "error",
                "react/no-array-index-key": "error",
                "react/no-children-prop": "error",
                "react/no-danger": "error",
                "react/no-danger-with-children": "error",
                "react/no-deprecated": "error",
                "react/no-did-mount-set-state": "error",
                "react/no-did-update-set-state": "error",
                "react/no-direct-mutation-state": "error",
                "react/no-find-dom-node": "error",
                "react/no-invalid-html-attribute": "warn",
                "react/no-is-mounted": "error",
                "react/no-redundant-should-component-update": "error",
                "react/no-render-return-value": "error",
                "react/no-string-refs": "error",
                "react/no-this-in-sfc": "error",
                "react/no-typos": "error",
                "react/no-unknown-property": "error",
                "react/no-unused-state": "warn",
                "react/require-render-return": "error",
                "react/self-closing-comp": "warn",
                "react/void-dom-elements-no-children": "error",
                // JSX-specific rules - https://github.com/jsx-eslint/eslint-plugin-react#jsx-specific-rules
                "react/jsx-boolean-value": ["off", "always"],
                "react/jsx-curly-brace-presence": ["warn", "never"],
                "react/jsx-fragments": "warn",
                "react/jsx-key": [
                    "error",
                    {
                        checkFragmentShorthand: true,
                        checkKeyMustBeforeSpread: true,
                        warnOnDuplicates: true,
                    },
                ],
                "react/jsx-no-comment-textnodes": "error",
                "react/jsx-no-duplicate-props": "error",
                "react/jsx-no-script-url": "error",
                "react/jsx-no-target-blank": "warn",
                "react/jsx-no-undef": "error",
                "react/jsx-no-useless-fragment": [
                    "warn",
                    {
                        allowExpressions: true,
                    },
                ],
                "react/jsx-pascal-case": "warn",
                "react/jsx-props-no-spreading": "off",
                "react/jsx-uses-react": "error",
                "react/jsx-uses-vars": "error",
                // Other
                "no-restricted-imports": [
                    "off",
                    {
                        ...baseRestrictedImports,
                        paths: [
                            {
                                name: "react",
                                importNames: ["default"],
                                message: "'import React' is not needed due to the new JSX transform: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html\n\nIf you need a named export, use: 'import { Something } from \"react\"'",
                            },
                        ],
                    },
                ],
                "jsx-a11y/click-events-have-key-events": "off",
                "jsx-a11y/no-static-element-interactions": "off",
                "jsx-a11y/no-noninteractive-element-interactions": "off",
            },
        },
        {
            files: ["*.test.js", "*.test.ts", "*.test.jsx", "*.test.tsx", "test/**"],
            env: {
                "jest/globals": true,
            },
            rules: {
                "jest/consistent-test-it": [
                    "warn",
                    {
                        withinDescribe: "test",
                    },
                ],
                "jest/expect-expect": "warn",
                "jest/no-alias-methods": "warn",
                "jest/no-commented-out-tests": "warn",
                "jest/no-conditional-expect": "error",
                "jest/no-conditional-in-test": "error",
                "jest/no-deprecated-functions": "error",
                "jest/no-disabled-tests": "warn",
                "jest/no-done-callback": "error",
                "jest/no-export": "error",
                "jest/no-focused-tests": "warn",
                "jest/no-identical-title": "error",
                "jest/no-interpolation-in-snapshots": "error",
                "jest/no-jasmine-globals": "error",
                "jest/no-mocks-import": "error",
                "jest/no-standalone-expect": "error",
                "jest/no-test-prefixes": "warn",
                "jest/no-test-return-statement": "error",
                "jest/prefer-comparison-matcher": "warn",
                "jest/prefer-each": "warn",
                "jest/prefer-equality-matcher": "warn",
                "jest/prefer-lowercase-title": [
                    "warn",
                    {
                        ignoreTopLevelDescribe: true,
                    },
                ],
                "jest/prefer-mock-promise-shorthand": "warn",
                "jest/prefer-spy-on": "warn",
                "jest/prefer-strict-equal": "error",
                "jest/prefer-to-be": "warn",
                "jest/prefer-to-contain": "warn",
                "jest/prefer-to-have-length": "warn",
                "jest/require-top-level-describe": "error",
                "jest/valid-describe-callback": "error",
                "jest/valid-expect": "error",
                "jest/valid-expect-in-promise": "error",
                "jest/valid-title": "warn",
                // Other
                "@typescript-eslint/naming-convention": "off",
            },
        },
        {
            files: ["*.test.jsx", "*.test.tsx"],
            rules: {
                // React Testing Library - https://github.com/testing-library/eslint-plugin-testing-library
                "testing-library/await-async-query": "error",
                "testing-library/await-async-utils": "error",
                "testing-library/no-await-sync-query": "error",
                "testing-library/no-container": "error",
                "testing-library/no-debugging-utils": "warn",
                "testing-library/no-dom-import": ["error", "react"],
                "testing-library/no-global-regexp-flag-in-query": "warn",
                "testing-library/no-node-access": "warn",
                "testing-library/no-unnecessary-act": "warn",
                "testing-library/no-wait-for-empty-callback": "error",
                "testing-library/no-wait-for-multiple-assertions": "error",
                "testing-library/no-wait-for-side-effects": "error",
                "testing-library/no-wait-for-snapshot": "error",
                "testing-library/prefer-find-by": "warn",
                "testing-library/prefer-presence-queries": "error",
                "testing-library/prefer-query-by-disappearance": "error",
                "testing-library/prefer-screen-queries": "warn",
                "testing-library/prefer-user-event": "error",
                "testing-library/prefer-wait-for": "warn",
                "testing-library/render-result-naming-convention": "error",
                // Jest - https://github.com/jest-community/eslint-plugin-jest
                "jest/expect-expect": [
                    "warn",
                    {
                        assertFunctionNames: ["expect", "*.getBy*", "*.getAllBy*", "*.findBy*", "*.findAllBy*"],
                    },
                ],
            },
        },
    ],
    rules: {
        // Possible Problems - https://eslint.org/docs/latest/rules/#possible-problems
        "array-callback-return": "error",
        "constructor-super": "error",
        "for-direction": "error",
        "getter-return": "error",
        "no-async-promise-executor": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-const-assign": "error",
        "no-constant-condition": "error",
        "no-constructor-return": "error",
        "no-control-regex": "error",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty-character-class": "error",
        "no-empty-pattern": "error",
        "no-ex-assign": "error",
        "no-fallthrough": "error",
        "no-func-assign": "error",
        "no-import-assign": "error",
        "no-inner-declarations": ["error", "both"],
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-loss-of-precision": "error",
        "no-misleading-character-class": "error",
        "no-new-native-nonconstructor": "error",
        "no-obj-calls": "error",
        "no-prototype-builtins": "error",
        "no-self-assign": "warn",
        "no-self-compare": "warn",
        "no-setter-return": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-this-before-super": "error",
        "no-undef": "error",
        "no-unexpected-multiline": "error",
        "no-unmodified-loop-condition": "error",
        "no-unreachable": "warn",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-vars": "warn",
        "no-useless-backreference": "error",
        "use-isnan": "error",
        "valid-typeof": "error",
        // Suggestions - https://eslint.org/docs/latest/rules/#suggestions
        "consistent-return": "error",
        curly: "warn",
        "default-param-last": "error",
        eqeqeq: "error",
        "func-names": ["warn", "never"],
        "func-style": ["off", "declaration"],
        "no-array-constructor": "error",
        "no-bitwise": "error",
        "no-case-declarations": "error",
        "no-delete-var": "error",
        "no-else-return": "warn",
        "no-empty": "warn",
        "no-empty-function": "warn",
        "no-empty-static-block": "warn",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-boolean-cast": "warn",
        "no-floating-decimal": "error",
        "no-global-assign": "error",
        "no-implicit-coercion": "off",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-invalid-this": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-multi-assign": "warn",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-new-wrappers": "error",
        "no-nonoctal-decimal-escape": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "warn",
        "no-restricted-imports": ["off", baseRestrictedImports],
        "no-restricted-syntax": [
            "warn",
            /*{
                selector: "CallExpression[callee.name='String']",
                message: "Don't use the String function. Use .toString() instead.",
            },*/
            {
                selector: "CallExpression[callee.name='Number']",
                message: "Don't use the Number function. Use parseInt or parseFloat instead.",
            },
            {
                selector: "CallExpression[callee.name='Boolean']",
                message: "Don't use the Boolean function. Use a strict comparison instead.",
            },
        ],
        "no-return-assign": "warn",
        "no-script-url": "error",
        "no-sequences": "warn",
        "no-shadow": [
            "error",
            {
                ignoreOnInitialization: true,
            },
        ],
        "no-shadow-restricted-names": "error",
        "no-throw-literal": "error",
        "no-unused-expressions": "warn",
        "no-useless-call": "error",
        "no-useless-catch": "warn",
        "no-useless-computed-key": "warn",
        "no-useless-concat": "error",
        "no-useless-escape": "warn",
        "no-useless-rename": "warn",
        "no-useless-return": "warn",
        "no-var": "error",
        "no-with": "error",
        "one-var": ["warn", "never"],
        "operator-assignment": "warn",
        "prefer-arrow-callback": "warn",
        "prefer-const": "warn",
        "prefer-numeric-literals": "warn",
        "prefer-object-spread": "warn",
        "prefer-promise-reject-errors": "error",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "prefer-template": "warn",
        radix: "error",
        "require-await": "error",
        "require-yield": "error",
        // Layout & Formatting - https://eslint.org/docs/latest/rules/#layout--formatting
        // ---- Nothing in this category. Defer to Prettier. ----
        // React Hooks - https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        // React - https://github.com/jsx-eslint/eslint-plugin-react
        "react/jsx-filename-extension": [
            "error",
            {
                extensions: [".jsx", ".tsx"],
            },
        ],
        // Import - https://github.com/import-js/eslint-plugin-import
        "import/no-duplicates": "warn",
        "import/no-namespace": "off",
        "import/order": [
            "warn",
            {
                groups: ["builtin", "external", ["internal", "parent", "sibling", "index"], "type", "object"],
                "newlines-between": "ignore",
                "warnOnUnassignedImports": false,
            },
        ],
    },
}