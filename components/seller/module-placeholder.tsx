"use client";

import { useSeller } from "@/components/providers/seller-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ModulePlaceholderProps = {
  title: string;
  description: string;
};

export function ModulePlaceholder({ title, description }: ModulePlaceholderProps) {
  const { account } = useSeller();

  return (
    <Card className="rounded-lg border-[#D5D9D9] shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#0F1111]">{title}</CardTitle>
        <CardDescription>
          {account.storeName} · {account.categoryLabel}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
