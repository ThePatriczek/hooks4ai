"use client";

import { useSuspenseQuery, skipToken } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { RepositoryQueryVariables } from "@/app/gql/graphql";
import { repositoryQuery } from "@/app/repository/repositoryQuery";
import { wrap } from "@atlasgroup/react-wrap";
import dayjs from "dayjs";

type LooseCoupledViewProps = ReturnType<typeof useLooseCoupled>;
const LooseCoupledView = ({
  formState,
  register,
  onSubmit,
  data,
  handleSubmit,
}: LooseCoupledViewProps) => {
  return (
    <div>
      <h1>Loose coupled component</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col`}>
        <input {...register("owner", { required: true })} />
        {formState.errors.owner && <span>This field is required</span>}

        <input {...register("name", { required: true })} />
        {formState.errors.name && <span>This field is required</span>}

        <button type="submit">Submit</button>

        {dayjs(data?.repository?.createdAt).format("YYYY-MM-DD")}
      </form>
    </div>
  );
};

const useLooseCoupledData = ({ name, owner }: RepositoryQueryVariables) => {
  const { data } = useSuspenseQuery(
    repositoryQuery,
    name && owner ? { variables: { name, owner } } : skipToken
  );

  return data;
};

const useLooseCoupled = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const name = searchParams.get("name");

  const data = useLooseCoupledData({ name, owner });

  const hookFormProps = useForm<RepositoryQueryVariables>({
    defaultValues: {
      name: data?.repository?.name,
      owner: data?.repository?.owner.login,
    },
  });

  const onSubmit: SubmitHandler<RepositoryQueryVariables> = (data) =>
    router.push(`?owner=${data.owner}&name=${data.name}`);

  return {
    onSubmit,
    data,
    ...hookFormProps,
  };
};

export const LooseCoupled = wrap(LooseCoupledView, useLooseCoupled);
