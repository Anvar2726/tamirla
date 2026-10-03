import { Suspense } from "react";
import Spinner from "@/shared/ui/Spinner/Spinner";

export default function PageSuspense({ children }) {
  return <Suspense fallback={<Spinner label="Sahifa yuklanmoqda..." />}>{children}</Suspense>;
}
