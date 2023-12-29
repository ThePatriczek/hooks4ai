import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LooseCoupledView, LooseCoupledViewProps } from "./LooseCoupledView";
import "@testing-library/jest-dom/vitest";
describe("LooseCoupledView", () => {
  it("Renders without any error", async () => {
    const mockSubmit = vi.fn();
    const mockProps: LooseCoupledViewProps = {
      onSubmit: mockSubmit,
      titleInputProps: { value: "Test Title", onChange: vi.fn() },
      titleError: false,
      bodyInputProps: { value: "Test Body", onChange: vi.fn() },
      bodyError: false,
      createdAt: "2021-01-01",
    };

    const { container } = render(<LooseCoupledView {...mockProps} />);
    expect(document.body.contains(container)).toBe(true);
  });

  it("Submit button calls onSubmit prop when clicked", async () => {
    const mockSubmit = vi.fn();
    const mockProps: LooseCoupledViewProps = {
      onSubmit: mockSubmit,
      titleInputProps: { value: "Test Title", onChange: vi.fn() },
      titleError: false,
      bodyInputProps: { value: "Test Body", onChange: vi.fn() },
      bodyError: false,
      createdAt: "2021-01-01",
    };

    const { container } = render(<LooseCoupledView {...mockProps} />);
    const button = container.querySelector("button");
    if (button) fireEvent.click(button);
    expect(mockSubmit).toBeCalledTimes(1);
  });

  it("Title input changes value when input changed", async () => {
    const mockSubmit = vi.fn();

    const onChangeTitle = vi.fn();
    const mockProps: LooseCoupledViewProps = {
      onSubmit: mockSubmit,
      titleInputProps: { value: "Test Title", onChange: onChangeTitle },
      titleError: false,
      bodyInputProps: { value: "Test Body", onChange: vi.fn() },
      bodyError: false,
      createdAt: "2021-01-01",
    };

    const { getByTestId } = render(<LooseCoupledView {...mockProps} />);
    const titleInput = getByTestId("input-title");
    fireEvent.change(titleInput, { target: { value: "Changed Test Title" } });

    expect(onChangeTitle).toBeCalledTimes(1);
  });

  it("Shows error message when titleError is true", async () => {
    const mockSubmit = vi.fn();
    const mockProps: LooseCoupledViewProps = {
      onSubmit: mockSubmit,
      titleInputProps: { value: "Test Title", onChange: vi.fn() },
      titleError: true,
      bodyInputProps: { value: "Test Body", onChange: vi.fn() },
      bodyError: false,
      createdAt: "2021-01-01",
    };

    const { getByTestId } = render(<LooseCoupledView {...mockProps} />);
    const errorMessage = getByTestId("error-title");

    expect(errorMessage).toBeInTheDocument();
  });

  it("Title and body input fields are not empty", async () => {
    const mockSubmit = vi.fn();
    const mockProps: LooseCoupledViewProps = {
      onSubmit: mockSubmit,
      titleInputProps: { value: "Test Title", onChange: vi.fn() },
      titleError: false,
      bodyInputProps: { value: "Test Body", onChange: vi.fn() },
      bodyError: false,
      createdAt: "2021-01-01",
    };

    const { getByTestId } = render(<LooseCoupledView {...mockProps} />);
    const titleInput = getByTestId("input-title") as HTMLInputElement;
    const bodyInput = getByTestId("input-body") as HTMLInputElement;

    expect(titleInput.value).toBe("Test Title");
    expect(bodyInput.value).toBe("Test Body");
  });
});
