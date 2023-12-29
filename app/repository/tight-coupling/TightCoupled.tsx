"use client";

import { useSuspenseQuery, skipToken } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { graphql } from "@/app/gql";

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
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");

  const { data } = useSuspenseQuery(
    repositoryQuery,
    name && owner ? { variables: { name, owner } } : skipToken
  );

  const { register } = useForm({
    defaultValues: {
      name: data?.repository?.name,
      owner: data?.repository?.owner.login,
    },
  });

  return (
    <div>
      <h1>Tight coupled component</h1>
      <form>
        <input {...register("owner")} />
        <input {...register("name")} />
      </form>
    </div>
  );
};
