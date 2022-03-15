module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"sort-imports": ["error", {
		"ignoreCase": false,
		"ignoreDeclarationSort": false,
		"ignoreMemberSort": false,
		"memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
		"allowSeparatedGroups": false
	}],
	"rules": {
	},
}
