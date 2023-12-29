"use client";

import { useSuspenseQuery, skipToken, useMutation } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateIssueInput,
  CreateIssueMutationVariables,
  RepositoryQueryVariables,
} from "@/app/gql/graphql";
import {
  createIssueMutation,
  repositoryQuery,
} from "@/app/repository/repository";
import { wrap } from "@atlasgroup/react-wrap";
import dayjs from "dayjs";

type LooseCoupledViewProps = ReturnType<typeof useLooseCoupled>;
const LooseCoupledView = ({
  formState,
  register,
  onSubmit,
  handleSubmit,
  createdAt,
}: LooseCoupledViewProps) => {
  return (
    <div>
      <h1>Loose coupled component</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col`}>
        <input {...register("title", { required: true })} />
        {formState.errors.title && <span>Title field is required</span>}

        <input {...register("body", { required: true })} />
        {formState.errors.body && <span>Body field is required</span>}

        <button type="submit">Submit</button>
      </form>

      {dayjs(createdAt).format("YYYY-MM-DD")}
    </div>
  );
};

type useLooseCoupledDataProps = {
  owner: RepositoryQueryVariables["owner"] | null;
  name: RepositoryQueryVariables["name"] | null;
};

const useLooseCoupledData = ({ name, owner }: useLooseCoupledDataProps) => {
  const { data } = useSuspenseQuery(
    repositoryQuery,
    name && owner ? { variables: { name, owner } } : skipToken
  );

  return {
    id: data?.repository?.id,
    owner: data?.repository?.owner?.login,
    name: data?.repository?.name,
    createdAt: data?.repository?.createdAt,
  };
};

type useLooseCoupledFormProps = Partial<
  Pick<CreateIssueInput, "repositoryId"> &
    Pick<RepositoryQueryVariables, "owner" | "name">
>;

const useLooseCoupledForm = ({
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
    onSubmit,
    ...formProps,
  };
};

const useLooseCoupled = () => {
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");

  const dataProps = useLooseCoupledData({ name, owner });
  const { onSubmit, ...formProps } = useLooseCoupledForm({
    repositoryId: dataProps.id,
    owner: dataProps.owner,
    name: dataProps.name,
  });
  return {
    onSubmit,
    createdAt: dataProps.createdAt,
    ...formProps,
  };
};

export const LooseCoupled = wrap(LooseCoupledView, useLooseCoupled);
