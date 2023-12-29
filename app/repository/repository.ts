import { graphql } from "@/gql";

export const repositoryQuery = graphql(`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      owner {
        id
        login
      }
      name
      stargazerCount
      createdAt
      updatedAt
    }
  }
`);

export const createIssueMutation = graphql(`
  mutation createIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      clientMutationId
      issue {
        id
      }
    }
  }
`);
