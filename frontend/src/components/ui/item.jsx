var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
function ItemGroup({ className, ...props }) {
  return <div
    role="list"
    data-slot="item-group"
    className={cn("group/item-group flex flex-col", className)}
    {...props}
  />;
}
__name(ItemGroup, "ItemGroup");
function ItemSeparator({
  className,
  ...props
}) {
  return <Separator
    data-slot="item-separator"
    orientation="horizontal"
    className={cn("my-0", className)}
    {...props}
  />;
}
__name(ItemSeparator, "ItemSeparator");
const itemVariants = cva(
  "group/item [a]:hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 [a]:transition-colors flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "gap-4 p-4 ",
        sm: "gap-2.5 px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return <Comp
    data-slot="item"
    data-variant={variant}
    data-size={size}
    className={cn(itemVariants({ variant, size, className }))}
    {...props}
  />;
}
__name(Item, "Item");
const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted size-8 rounded-sm border [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ItemMedia({
  className,
  variant = "default",
  ...props
}) {
  return <div
    data-slot="item-media"
    data-variant={variant}
    className={cn(itemMediaVariants({ variant, className }))}
    {...props}
  />;
}
__name(ItemMedia, "ItemMedia");
function ItemContent({ className, ...props }) {
  return <div
    data-slot="item-content"
    className={cn(
      "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
      className
    )}
    {...props}
  />;
}
__name(ItemContent, "ItemContent");
function ItemTitle({ className, ...props }) {
  return <div
    data-slot="item-title"
    className={cn(
      "flex w-fit items-center gap-2 text-sm font-medium leading-snug",
      className
    )}
    {...props}
  />;
}
__name(ItemTitle, "ItemTitle");
function ItemDescription({ className, ...props }) {
  return <p
    data-slot="item-description"
    className={cn(
      "text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal",
      "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
      className
    )}
    {...props}
  />;
}
__name(ItemDescription, "ItemDescription");
function ItemActions({ className, ...props }) {
  return <div
    data-slot="item-actions"
    className={cn("flex items-center gap-2", className)}
    {...props}
  />;
}
__name(ItemActions, "ItemActions");
function ItemHeader({ className, ...props }) {
  return <div
    data-slot="item-header"
    className={cn(
      "flex basis-full items-center justify-between gap-2",
      className
    )}
    {...props}
  />;
}
__name(ItemHeader, "ItemHeader");
function ItemFooter({ className, ...props }) {
  return <div
    data-slot="item-footer"
    className={cn(
      "flex basis-full items-center justify-between gap-2",
      className
    )}
    {...props}
  />;
}
__name(ItemFooter, "ItemFooter");
export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
};
