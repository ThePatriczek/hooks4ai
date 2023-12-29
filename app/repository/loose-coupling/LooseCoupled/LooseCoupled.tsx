"use client";

import { wrap } from "@atlasgroup/react-wrap";
import { LooseCoupledView } from "@/app/repository/loose-coupling/LooseCoupled/LooseCoupledView";
import { useLooseCoupledView } from "@/app/repository/loose-coupling/LooseCoupled/useLooseCoupledView";

export const LooseCoupled = wrap(LooseCoupledView, useLooseCoupledView);
