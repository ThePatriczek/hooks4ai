import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "Awesome-Octocat-App",
        },
      },
    },
  ],
  documents: ["app/**/*.ts", "app/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./app/gql/": {
      preset: "client",
    },
  },
};

export default config;
