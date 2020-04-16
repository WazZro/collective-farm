module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "prettier",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "ignorePatterns": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/tslint",
        "import",
        "jsdoc",
        "prefer-arrow"
    ],
    "rules": {
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "accessibility": "explicit"
            }
        ],
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/quotes": [
            "error",
            "single"
        ],
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/unified-signatures": "error",
        "arrow-body-style": "error",
        "arrow-parens": [
            "off",
            "as-needed"
        ],
        "camelcase": "error",
        "comma-dangle": "off",
        "complexity": "off",
        "constructor-super": "error",
        "curly": "off",
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "id-blacklist": [
            "error",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined"
        ],
        "id-match": "error",
        "import/no-deprecated": "warn",
        "import/order": "off",
        "jsdoc/no-types": "error",
        "max-classes-per-file": "off",
        "max-len": [
            "error",
            {
                "code": 140
            }
        ],
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": [
            "error",
            {
                "allow": [
                    "log",
                    "warn",
                    "dir",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "error",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context"
                ]
            }
        ],
        "no-debugger": "error",
        "no-empty": "off",
        "no-eval": "error",
        "no-fallthrough": "error",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "off",
        "no-new-wrappers": "error",
        "no-restricted-imports": [
            "error",
            "rxjs/Rx"
        ],
        "no-shadow": [
            "error",
            {
                "hoist": "all"
            }
        ],
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "object-shorthand": "error",
        "one-var": [
            "error",
            "never"
        ],
        "prefer-arrow/prefer-arrow-functions": "error",
        "quote-props": [
            "error",
            "as-needed"
        ],
        "radix": "error",
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "asyncArrow": "always",
                "named": "never"
            }
        ],
        "spaced-comment": "error",
        "use-isnan": "error",
        "valid-typeof": "off",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "component-class-suffix": true,
                    "component-selector": true,
                    "contextual-lifecycle": true,
                    "directive-class-suffix": true,
                    "directive-selector": true,
                    "import-spacing": true,
                    "jsdoc-format": true,
                    "no-conflicting-lifecycle": true,
                    "no-host-metadata-property": true,
                    "no-input-rename": true,
                    "no-inputs-metadata-property": true,
                    "no-output-native": true,
                    "no-output-on-prefix": true,
                    "no-output-rename": true,
                    "no-outputs-metadata-property": true,
                    "no-reference-import": true,
                    "one-line": true,
                    "template-banana-in-box": true,
                    "template-no-negated-async": true,
                    "use-lifecycle-interface": true,
                    "use-pipe-transform-interface": true,
                    "whitespace": true
                }
            }
        ],
        "@typescript-eslint/await-thenable": [
            "error"
        ],
        "@typescript-eslint/no-for-in-array": [
            "error"
        ],
        "@typescript-eslint/no-misused-promises": [
            "error"
        ],
        "@typescript-eslint/no-unnecessary-type-assertion": [
            "error"
        ],
        "@typescript-eslint/prefer-includes": [
            "error"
        ],
        "@typescript-eslint/prefer-regexp-exec": [
            "error"
        ],
        "@typescript-eslint/prefer-string-starts-ends-with": [
            "error"
        ],
        "require-await": [
            "off"
        ],
        "@typescript-eslint/require-await": [
            "error"
        ],
        "@typescript-eslint/unbound-method": [
            "error"
        ],
        "no-var": [
            "error"
        ],
        "prefer-const": [
            "error"
        ],
        "prefer-rest-params": [
            "error"
        ],
        "prefer-spread": [
            "error"
        ],
        "@typescript-eslint/adjacent-overload-signatures": [
            "error"
        ],
        "@typescript-eslint/ban-ts-ignore": [
            "error"
        ],
        "@typescript-eslint/ban-types": [
            "error"
        ],
        "@typescript-eslint/camelcase": [
            "error"
        ],
        "@typescript-eslint/class-name-casing": [
            "error"
        ],
        "@typescript-eslint/consistent-type-assertions": [
            "error"
        ],
        "@typescript-eslint/explicit-function-return-type": [
            "warn"
        ],
        "no-array-constructor": [
            "off"
        ],
        "@typescript-eslint/no-array-constructor": [
            "error"
        ],
        "no-empty-function": [
            "off"
        ],
        "@typescript-eslint/no-empty-interface": [
            "error"
        ],
        "@typescript-eslint/no-inferrable-types": [
            "error"
        ],
        "@typescript-eslint/no-misused-new": [
            "error"
        ],
        "@typescript-eslint/no-namespace": [
            "error"
        ],
        "@typescript-eslint/no-this-alias": [
            "error"
        ],
        "no-unused-vars": [
            "off"
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn"
        ],
        "no-use-before-define": [
            "off"
        ],
        "@typescript-eslint/prefer-namespace-keyword": [
            "error"
        ],
        "@typescript-eslint/triple-slash-reference": [
            "error"
        ],
        "@typescript-eslint/type-annotation-spacing": [
            "error"
        ]
    },
    "settings": {}
};
