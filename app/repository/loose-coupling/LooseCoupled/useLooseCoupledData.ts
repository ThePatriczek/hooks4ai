import { RepositoryQueryVariables } from "@/app/gql/graphql";
import { skipToken, useSuspenseQuery } from "@apollo/client";
import { repositoryQuery } from "@/app/repository/repository";

type useLooseCoupledDataProps = {
  owner: RepositoryQueryVariables["owner"] | null;
  name: RepositoryQueryVariables["name"] | null;
};

export const useLooseCoupledData = ({
  name,
  owner,
}: useLooseCoupledDataProps) => {
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
