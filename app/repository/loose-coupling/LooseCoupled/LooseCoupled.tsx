"use client";

import { wrap } from "@atlasgroup/react-wrap";
import { LooseCoupledView } from "@/repository/loose-coupling/LooseCoupled/LooseCoupledView";
import { useLooseCoupledView } from "@/repository/loose-coupling/LooseCoupled/useLooseCoupledView";

export const LooseCoupled = wrap(LooseCoupledView, useLooseCoupledView);
