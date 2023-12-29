"use client";

import {
  DetailedHTMLProps,
  FormEventHandler,
  InputHTMLAttributes,
} from "react";
import dayjs from "dayjs";

export type LooseCoupledViewProps = {
  onSubmit: FormEventHandler;
  titleInputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  titleError: boolean;
  bodyInputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  bodyError: boolean;
  createdAt: string | null;
};

export const LooseCoupledView = ({
  onSubmit,
  titleInputProps,
  titleError,
  bodyInputProps,
  bodyError,
  createdAt,
}: LooseCoupledViewProps) => (
  <div>
    <h1>Loose coupled component</h1>
    <form onSubmit={onSubmit} className={`flex flex-col`}>
      <input data-testid={`input-title`} {...titleInputProps} />
      {titleError && (
        <span data-testid={`error-title`}>Title field is required</span>
      )}

      <input data-testid={`input-body`} {...bodyInputProps} />
      {bodyError && (
        <span data-testid={`error-body`}>Body field is required</span>
      )}

      <button type="submit">Submit</button>
    </form>

    {dayjs(createdAt).format("YYYY-MM-DD")}
  </div>
);
