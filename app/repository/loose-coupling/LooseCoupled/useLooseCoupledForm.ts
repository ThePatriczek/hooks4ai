import {
  CreateIssueInput,
  CreateIssueMutationVariables,
  RepositoryQueryVariables,
} from "@/gql/graphql";
import { useForm } from "react-hook-form";

type useLooseCoupledFormProps = Partial<
  Pick<CreateIssueInput, "repositoryId"> &
    Pick<RepositoryQueryVariables, "owner" | "name">
>;

export const useLooseCoupledForm = ({
  owner,
  name,
}: useLooseCoupledFormProps) => {
  const repo = `${owner}/${name}`;

  // here could be more configuration for the useForm hook that can be tested
  return useForm<Pick<CreateIssueMutationVariables["input"], "body" | "title">>(
    {
      defaultValues: {
        title: `Title for repo ${repo}`,
        body: `Body for repo ${repo}`,
      },
    }
  );
};
