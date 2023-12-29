import {
  CreateIssueInput,
  CreateIssueMutationVariables,
  RepositoryQueryVariables,
} from "@/app/gql/graphql";
import { useMutation } from "@apollo/client";
import { createIssueMutation } from "@/app/repository/repository";
import { SubmitHandler, useForm } from "react-hook-form";

type useLooseCoupledFormProps = Partial<
  Pick<CreateIssueInput, "repositoryId"> &
    Pick<RepositoryQueryVariables, "owner" | "name">
>;

export const useLooseCoupledForm = ({
  repositoryId,
  owner,
  name,
}: useLooseCoupledFormProps) => {
  const repo = `${owner}/${name}`;
  const [createIssue] = useMutation(createIssueMutation);

  const formProps = useForm<
    Pick<CreateIssueMutationVariables["input"], "body" | "title">
  >({
    defaultValues: {
      title: `Title for repo ${repo}`,
      body: `Body for repo ${repo}`,
    },
  });

  const onSubmit: SubmitHandler<
    Pick<CreateIssueMutationVariables["input"], "body" | "title">
  > = (formData) => {
    if (!repositoryId) return;

    createIssue({
      variables: {
        input: {
          repositoryId,
          body: formData.body,
          title: formData.title,
        },
      },
    }).catch(console.error);
  };

  return {
    onSubmit: formProps.handleSubmit(onSubmit),
    ...formProps,
  };
};
