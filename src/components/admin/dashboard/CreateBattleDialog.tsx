
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export const CreateBattleDialog = () => {
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 md:mt-0 bg-sixty40-purple hover:bg-sixty40-purple/90">
          <Plus size={16} className="mr-2" />
          Create New Battle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-white/10">
        <DialogHeader>
          <DialogTitle>New Battle</DialogTitle>
          <DialogDescription>
            Create a new weekly battle. This will be in draft mode until you publish it.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            In a real app, there would be a form here to create a new battle.
          </p>
          <Button
            className="w-full bg-sixty40-purple hover:bg-sixty40-purple/90"
            onClick={() => {
              toast({
                title: "Created!",
                description: "New battle has been created in draft mode",
              });
            }}
          >
            Create Battle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
