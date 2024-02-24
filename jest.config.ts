import type {Config} from "@jest/types";

const config:Config.InitialOptions =  {
	roots:["<rootDir>/src"],
	transform:{
		"^.+\\.tsx?$":"ts-jest"
	},
	setupFilesAfterEnv:[
		"@testing-library/jest-dom/extend-expect"
	],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions:["ts","tsx","js","jsx","json","node"],
	testEnvironment:"jsdom",
	collectCoverage:true,
    "moduleNameMapper": {
      "axios": "axios/dist/node/axios.cjs",
      "assets/(.*)": [
        "<rootDir>/images/$1",
        "<rootDir>/photos/$1",
        "<rootDir>/recipes/$1"
      ]
    },
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,tsx}",
      "!src/index.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 100,
        "functions": 50,
        "lines": 50,
        "statements": 50
      },
      "./src/components/": {
        "branches": 40,
        "statements": 40
      },
      "./src/reducers/**/*.js": {
        "statements": 90
      },
      "./src/api/very-important-module.js": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    }
  }
export default config;