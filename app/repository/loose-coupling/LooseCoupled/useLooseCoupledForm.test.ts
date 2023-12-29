import { describe, it, expect } from "vitest";
import { useLooseCoupledForm } from "./useLooseCoupledForm";
import { renderHook } from "@testing-library/react";

// Define the test suite for "useLooseCoupledForm"
describe("useLooseCoupledForm", () => {
  // Define a test to check the functionality of the useLooseCoupledForm function
  it("should return form with default values", () => {
    // Mock the required variables for the useLooseCoupledForm function
    const owner = "testOwner";
    const name = "testName";

    // Call the useLooseCoupledForm function using the renderHook utility
    const { result } = renderHook(() => useLooseCoupledForm({ owner, name }));

    // Check if the function returned the expected default values
    expect(result.current.formState.defaultValues).toEqual({
      title: `Title for repo ${owner}/${name}`,
      body: `Body for repo ${owner}/${name}`,
    });
  });
});
