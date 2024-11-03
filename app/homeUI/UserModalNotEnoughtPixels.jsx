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
import Link from "next/link";

export default function UserModalNotEnoughPixels({
  isModalOpen,
  setIsModalOpen,
}) {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pas assez de pixels</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            Vous n'avez pas assez de pixels pour placer un pixel sur la toile.
            Vous pouvez donner a notre projet 4L trophy et recevoir des pixels
            en retour en utilisant le bouton ci-dessous.
            <Link target="_blank" href="https://www.niclem-4l.org/donate">
              <Button>Faire un don</Button>
            </Link>
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
