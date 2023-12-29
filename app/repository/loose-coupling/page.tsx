import { Suspense } from "react";
import { LooseCoupled } from "@/app/repository/loose-coupling/LooseCoupled";

export default function LooseCoupling() {
  return (
    <Suspense fallback={`loading...`}>
      <LooseCoupled />
    </Suspense>
  );
}
