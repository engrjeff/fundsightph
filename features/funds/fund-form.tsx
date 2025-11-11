"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import {
  Controller,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { FundType } from "@/app/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { FUND_ICONS } from "@/lib/constants";
import { createFund } from "./actions";
import { type FundCreateInputs, fundCreateSchema } from "./schema";

export function FundFormDialog() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button type="button" size="sm">
            <PlusIcon /> Add Fund
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Create Fund</DrawerTitle>
            <DrawerDescription>Create a new source of fund.</DrawerDescription>
          </DrawerHeader>
          <div className="p-6">
            <FundForm onAfterSave={() => setOpen(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm">
          <PlusIcon /> Add Fund
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Fund</DialogTitle>
          <DialogDescription>Create a new source of fund.</DialogDescription>
        </DialogHeader>
        <FundForm onAfterSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function FundForm({ onAfterSave }: { onAfterSave: VoidFunction }) {
  const form = useForm<FundCreateInputs>({
    resolver: zodResolver(fundCreateSchema),
    defaultValues: {
      name: "",
      type: FundType.BANK,
      icon: "",
      balance: 0,
      notes: "",
    },
  });

  const fundTypeValue = form.watch("type");

  const createAction = useAction(createFund, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(error.serverError ?? `Error creating fund`);
    },
  });

  const isBusy = createAction.isPending;

  const onFormError: SubmitErrorHandler<FundCreateInputs> = (errors) => {
    console.log(`Create Fund Form Errors: `, errors);
  };

  const onSubmit: SubmitHandler<FundCreateInputs> = async (data) => {
    try {
      const result = await createAction.executeAsync(data);

      if (result.data?.fund) {
        toast.success(`Fund ${result.data.fund.name} saved!`);

        onAfterSave();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  function handleClose() {
    form.reset();
    onAfterSave();
  }

  return (
    <form
      id="create-fund-form"
      onSubmit={form.handleSubmit(onSubmit, onFormError)}
    >
      <FieldSet disabled={isBusy} className="disabled:opacity-90">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Fund name or alias"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={form.control}
            name="type"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={(args) => {
                    form.setValue("icon", "");
                    field.onChange(args);
                  }}
                >
                  <SelectTrigger id="type" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Choose fund type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={FundType.CASH}>Cash</SelectItem>
                    <SelectItem value={FundType.BANK}>Bank Account</SelectItem>
                    <SelectItem value={FundType.E_WALLET}>E-Wallet</SelectItem>
                    <SelectItem value={FundType.OTHER}>
                      Others (e.g. Goverment, Corporation, Insurance)
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={form.control}
            name="icon"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="icon">Icon</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="icon"
                    className="pl-1.5"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Choose an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUND_ICONS[fundTypeValue].map((icon) => (
                      <SelectItem key={icon.name} value={icon.logo}>
                        {fundTypeValue === FundType.CASH ? (
                          <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                            <DynamicIcon
                              name={icon.logo as IconName}
                              className="size-4 text-current"
                            />
                          </div>
                        ) : (
                          <Image
                            unoptimized
                            src={icon.logo}
                            alt={icon.name}
                            width={24}
                            height={24}
                            className="size-6 rounded object-contain"
                          />
                        )}{" "}
                        <span>{icon.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="balance"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="balance">Balance</FieldLabel>
                <NumberInput
                  usePeso
                  id="balance"
                  aria-invalid={fieldState.invalid}
                  placeholder="0.00"
                  autoComplete="off"
                  {...form.register(field.name, { valueAsNumber: true })}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Field orientation="horizontal" className="justify-end pt-6">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <SubmitButton type="submit" form="create-fund-form" loading={isBusy}>
            Save Fund
          </SubmitButton>
        </Field>
      </FieldSet>
    </form>
  );
}
