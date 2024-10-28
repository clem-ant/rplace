import { Button } from "@/components/ui/button";

function UserPlacePixel({ handlePlacePixel }) {
  return (
    <div>
      <Button onClick={handlePlacePixel}>Place</Button>
    </div>
  );
}

export default UserPlacePixel;
