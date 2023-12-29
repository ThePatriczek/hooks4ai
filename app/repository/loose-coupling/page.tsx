import { Suspense } from "react";
import { LooseCoupled } from "@/repository/loose-coupling/LooseCoupled/LooseCoupled";

export default function LooseCoupling() {
  return (
    <Suspense fallback={`loading...`}>
      <LooseCoupled />
    </Suspense>
  );
}
