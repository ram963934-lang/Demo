import { Container } from "@/components/common";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="flex min-h-[40vh] flex-col justify-center gap-4 py-16">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full max-w-md" />
      <Skeleton className="h-4 w-full max-w-sm" />
    </Container>
  );
}
