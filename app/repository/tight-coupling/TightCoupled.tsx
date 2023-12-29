"use client";

import { useSuspenseQuery, skipToken } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphql } from "@/app/gql";
import { RepositoryQueryVariables } from "@/app/gql/graphql";

const repositoryQuery = graphql(`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      owner {
        id
        login
      }
      name
      stargazerCount
    }
  }
`);

export const TightCoupled = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");

  const { data } = useSuspenseQuery(
    repositoryQuery,
    name && owner ? { variables: { name, owner } } : skipToken
  );

  const { register, handleSubmit } = useForm<RepositoryQueryVariables>({
    defaultValues: {
      name: data?.repository?.name,
      owner: data?.repository?.owner.login,
    },
  });

  const onSubmit: SubmitHandler<RepositoryQueryVariables> = (data) =>
    router.push(`?owner=${data.owner}&name=${data.name}`);

  return (
    <div>
      <h1>Tight coupled component</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("owner")} />
        <input {...register("name")} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
