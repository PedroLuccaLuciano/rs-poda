import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { imageUrl } from "@/components/Picture";
import type { GalleryItem } from "./Gallery";

export default function GalleryLightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        <DialogTitle className="sr-only">{item.alt}</DialogTitle>
        <img
          src={imageUrl(item.image)}
          alt={item.alt}
          className="max-h-[80svh] w-full object-contain bg-primary"
        />
      </DialogContent>
    </Dialog>
  );
}
