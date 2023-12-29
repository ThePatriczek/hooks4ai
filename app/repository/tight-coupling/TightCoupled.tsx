"use client";

import { useSuspenseQuery, skipToken } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { RepositoryQueryVariables } from "@/app/gql/graphql";
import { repositoryQuery } from "@/app/repository/repositoryQuery";

export const TightCoupled = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");

  const { data } = useSuspenseQuery(
    repositoryQuery,
    name && owner ? { variables: { name, owner } } : skipToken
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RepositoryQueryVariables>({
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
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col`}>
        <input {...register("owner", { required: true })} />
        {errors.owner && <span>This field is required</span>}

        <input {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
