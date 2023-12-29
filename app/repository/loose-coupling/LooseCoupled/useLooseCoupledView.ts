"use client";

import { LooseCoupledViewProps } from "@/repository/loose-coupling/LooseCoupled/LooseCoupledView";
import { useSearchParams } from "next/navigation";
import { useLooseCoupledData } from "@/repository/loose-coupling/LooseCoupled/useLooseCoupledData";
import { useLooseCoupledForm } from "@/repository/loose-coupling/LooseCoupled/useLooseCoupledForm";

export const useLooseCoupledView = (): LooseCoupledViewProps => {
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");
  const dataProps = useLooseCoupledData({ name, owner });

  const { onSubmit, formState, register } = useLooseCoupledForm({
    repositoryId: dataProps.id,
    owner: dataProps.owner,
    name: dataProps.name,
  });

  return {
    onSubmit,
    titleInputProps: register("title", { required: true }),
    bodyInputProps: register("body", { required: true }),
    createdAt: dataProps.createdAt,
    bodyError: !!formState.errors.body,
    titleError: !!formState.errors.title,
  };
};
