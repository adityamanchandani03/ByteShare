var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
function Spinner({ className, ...props }) {
  return <Loader2Icon
    role="status"
    aria-label="Loading"
    className={cn("size-4 animate-spin", className)}
    {...props}
  />;
}
__name(Spinner, "Spinner");
export {
  Spinner
};
