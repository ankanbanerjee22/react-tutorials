module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    extends: ['airbnb-base'],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "2021",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": false,
          },
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
