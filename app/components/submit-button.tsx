import { useIsSubmitting } from "remix-validated-form";
import { Button } from "./button";

export const SubmitButton = ({ submitText = "Submit" }: { submitText?: string }) => {
  const isSubmitting = useIsSubmitting();

  return (
    <Button type="submit" disabled={isSubmitting} variant="primary">
      {isSubmitting ? "Submitting..." : submitText}
    </Button>
  );
};
