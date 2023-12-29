"use client";

import { useSuspenseQuery, skipToken, useMutation } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateIssueMutationVariables } from "@/gql/graphql";
import { createIssueMutation, repositoryQuery } from "@/repository/repository";
import dayjs from "dayjs";

export const TightCoupled = () => {
  const searchParams = useSearchParams(); // coupling with nextjs search params
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");

  const { data } = useSuspenseQuery(
    // coupling with apollo client
    repositoryQuery,
    name && owner ? { variables: { name, owner } } : skipToken
  );

  const [createIssue] = useMutation(createIssueMutation);

  const repo = `${data?.repository?.owner.login}/${data?.repository?.name}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<CreateIssueMutationVariables["input"], "body" | "title">>({
    // coupling with react-hook-form
    defaultValues: {
      title: `Title for repo ${repo}`,
      body: `Body for repo ${repo}`,
    },
  });

  const onSubmit: SubmitHandler<
    Pick<CreateIssueMutationVariables["input"], "body" | "title">
  > = (formData) => {
    if (!data?.repository?.id) return;

    createIssue({
      variables: {
        input: {
          repositoryId: data?.repository?.id,
          body: formData.body,
          title: formData.title,
        },
      },
    }).catch(console.error);
  };

  return (
    <div>
      <h1>Tight coupled component</h1>
      <h2>Create new issue</h2>
      {/* coupling with react-hook-form */}
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col`}>
        <input
          data-testid={`input-title`}
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span data-testid={`error-title`}>Title field is required</span>
        )}

        <input
          data-testid={`input-body`}
          {...register("body", { required: true })}
        />
        {errors.body && (
          <span data-testid={`error-body`}>Body field is required</span>
        )}

        <button type="submit">Submit</button>
      </form>

      {/* coupling with dayjs */}
      {dayjs(data?.repository?.createdAt).format("YYYY-MM-DD")}
    </div>
  );
};
