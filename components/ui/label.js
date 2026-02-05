// Label component extends from shadcnui - https://ui.shadcn.com/docs/components/label

"use client";
import * as React from "react";

import { cn } from "../../utils/services/helper";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-[var(--txt-clr)] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
