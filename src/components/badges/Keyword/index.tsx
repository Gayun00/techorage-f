import { Badge } from "@/components/ui/badge";
import React from "react";

interface Props {
  children: string;
}

function Keyword({ children }: Props) {
  return (
    <button type="button">
      <Badge variant="secondary">{children}</Badge>
    </button>
  );
}

export default Keyword;
