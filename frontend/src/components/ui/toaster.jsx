var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@/components/ui/toast";
function Toaster() {
  const { toasts } = useToast();
  return <ToastProvider>
      {toasts.map(function({ id, title, description, action, ...props }) {
    return <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>;
  })}
      <ToastViewport />
    </ToastProvider>;
}
__name(Toaster, "Toaster");
export {
  Toaster
};
