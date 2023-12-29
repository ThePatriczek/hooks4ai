import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect } from "vitest";
import { useLooseCoupledData } from "./useLooseCoupledData";
import { renderHook } from "@testing-library/react";
import { repositoryQuery } from "@/repository/repository";
import { InMemoryCache } from "@apollo/client";

describe("useLooseCoupledData function tests", () => {
  it("can retrieve repository information from Apollo cache", async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: repositoryQuery,
      data: {
        repository: {
          id: "123",
          owner: {
            id: "123",
            login: "owner-name",
          },
          name: "repo-name",
          createdAt: "2023-01-01",
          updatedAt: "2023-01-01",
          stargazerCount: 0,
        },
      },
      variables: {
        name: "repo-name",
        owner: "owner-name",
      },
    });
    const wrapper = ({ children }) => (
      <MockedProvider cache={cache}>{children}</MockedProvider>
    );

    const { result } = renderHook(
      () =>
        useLooseCoupledData({
          name: "repo-name",
          owner: "owner-name",
        }),
      { wrapper }
    );

    // Assertions
    expect(result.current.owner).toEqual("owner-name");
    expect(result.current.name).toEqual("repo-name");
    expect(result.current.id).toEqual("123");
    expect(result.current.createdAt).toEqual("2023-01-01");
  });
});
