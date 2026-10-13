import { cn } from "@/lib/utils";
import { EMAIL, EMAIL_URL } from "@/lib/email";
import { trackEmailClick } from "@/lib/analytics";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Mail } from "lucide-react";

type Props = Omit<ButtonProps, "asChild"> & {
  /** Identificador da posição do botão, usado no evento de conversão. */
  location: string;
  children: React.ReactNode;
};

export function EmailButton({
  location,
  children,
  className,
  variant = "outlineLight",
  size = "lg",
  ...rest
}: Props) {
  if (!EMAIL) return null;
  return (
    <Button asChild variant={variant} size={size} className={cn(className)} {...rest}>
      <a href={EMAIL_URL} onClick={() => trackEmailClick(location)} data-email-location={location}>
        <Mail aria-hidden="true" className="size-5" />
        {children}
      </a>
    </Button>
  );
}
