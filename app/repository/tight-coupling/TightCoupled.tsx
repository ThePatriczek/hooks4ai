"use client";

import { useSuspenseQuery, skipToken } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { RepositoryQueryVariables } from "@/app/gql/graphql";
import { repositoryQuery } from "@/app/repository/repositoryQuery";
import dayjs from "dayjs";

export const TightCoupled = () => {
  const router = useRouter(); // coupling with nextjs router
  const searchParams = useSearchParams(); // coupling with nextjs search params
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");

  const { data } = useSuspenseQuery(
    // coupling with apollo client
    repositoryQuery,
    name && owner ? { variables: { name, owner } } : skipToken
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RepositoryQueryVariables>({
    // coupling with react-hook-form
    defaultValues: {
      name: data?.repository?.name,
      owner: data?.repository?.owner.login,
    },
  });

  const onSubmit: SubmitHandler<RepositoryQueryVariables> = (data) =>
    router.push(`?owner=${data.owner}&name=${data.name}`); // coupling with nextjs router

  return (
    <div>
      <h1>Tight coupled component</h1>
      {/* coupling with react-hook-form */}
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col`}>
        <input {...register("owner", { required: true })} />
        {errors.owner && <span>This field is required</span>}

        <input {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}

        <button type="submit">Submit</button>
      </form>

      {/* coupling with dayjs */}
      {dayjs(data?.repository?.createdAt).format("YYYY-MM-DD")}
    </div>
  );
};
