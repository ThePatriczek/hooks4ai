import { Suspense } from "react";
import { TightCoupled } from "@/app/repository/tight-coupling/TightCoupled";

export default function TightCoupling() {
  return (
    <Suspense fallback={`loading...`}>
      <TightCoupled />
    </Suspense>
  );
}
