
import * as React from "react"
import * as AlertModalPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertModal = AlertModalPrimitive.Root

const AlertModalTrigger = AlertModalPrimitive.Trigger

const AlertModalPortal = AlertModalPrimitive.Portal

const AlertModalOverlay = React.forwardRef<
  React.ElementRef<typeof AlertModalPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertModalPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertModalOverlay.displayName = AlertModalPrimitive.Overlay.displayName

const AlertModalContent = React.forwardRef<
  React.ElementRef<typeof AlertModalPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertModalPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertModalPortal>
    <AlertModalOverlay />
    <AlertModalPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-white/10 bg-background/80 backdrop-blur-md p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertModalPortal>
))
AlertModalContent.displayName = AlertModalPrimitive.Content.displayName

const AlertModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertModalHeader.displayName = "AlertModalHeader"

const AlertModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertModalFooter.displayName = "AlertModalFooter"

const AlertModalTitle = React.forwardRef<
  React.ElementRef<typeof AlertModalPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertModalPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertModalPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertModalTitle.displayName = AlertModalPrimitive.Title.displayName

const AlertModalDescription = React.forwardRef<
  React.ElementRef<typeof AlertModalPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertModalPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertModalPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertModalDescription.displayName =
  AlertModalPrimitive.Description.displayName

const AlertModalAction = React.forwardRef<
  React.ElementRef<typeof AlertModalPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertModalPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertModalPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertModalAction.displayName = AlertModalPrimitive.Action.displayName

const AlertModalCancel = React.forwardRef<
  React.ElementRef<typeof AlertModalPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertModalPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertModalPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertModalCancel.displayName = AlertModalPrimitive.Cancel.displayName

export {
  AlertModal,
  AlertModalPortal,
  AlertModalOverlay,
  AlertModalTrigger,
  AlertModalContent,
  AlertModalHeader,
  AlertModalFooter,
  AlertModalTitle,
  AlertModalDescription,
  AlertModalAction,
  AlertModalCancel,
}
