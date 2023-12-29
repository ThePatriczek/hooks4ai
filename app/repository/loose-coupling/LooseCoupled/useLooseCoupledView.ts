"use client";

import { LooseCoupledViewProps } from "@/repository/loose-coupling/LooseCoupled/LooseCoupledView";
import { useSearchParams } from "next/navigation";
import { useLooseCoupledData } from "@/repository/loose-coupling/LooseCoupled/useLooseCoupledData";
import { useLooseCoupledForm } from "@/repository/loose-coupling/LooseCoupled/useLooseCoupledForm";
import { useMutation } from "@apollo/client";
import { createIssueMutation } from "@/repository/repository";
import { SubmitHandler } from "react-hook-form";
import { CreateIssueMutationVariables } from "@/gql/graphql";

export const useLooseCoupledView = (): LooseCoupledViewProps => {
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");
  const dataProps = useLooseCoupledData({ name, owner });
  const [createIssue] = useMutation(createIssueMutation);

  const { formState, register, handleSubmit } = useLooseCoupledForm({
    owner: dataProps.owner,
    name: dataProps.name,
  });

  const onSubmit: SubmitHandler<
    Pick<CreateIssueMutationVariables["input"], "body" | "title">
  > = (formData) => {
    if (!dataProps.id) return;

    createIssue({
      variables: {
        input: {
          repositoryId: dataProps.id,
          body: formData.body,
          title: formData.title,
        },
      },
    }).catch(console.error);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    titleInputProps: register("title", { required: true }),
    bodyInputProps: register("body", { required: true }),
    createdAt: dataProps.createdAt,
    bodyError: !!formState.errors.body,
    titleError: !!formState.errors.title,
  };
};
