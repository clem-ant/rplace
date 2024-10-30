import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserModalNotConnected({ isModalOpen, setIsModalOpen }) {
  const { data: session } = useSession();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (session) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vous n'êtes pas connecté</DialogTitle>
          <DialogDescription>
            Veuillez vous{" "}
            <span
              className="hover:underline cursor-pointer text-blue-500"
              onClick={() => signIn()}
            >
              connecter
            </span>{" "}
            pour placer un pixel sur le canevas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClose} variant="destructive">
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
