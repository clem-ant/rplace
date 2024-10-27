import { getServerSession } from "next-auth";
import UserWrapper from "./UserWrapper";

export default function Home() {
  const session = getServerSession();
  return (
    <div className="font-[family-name:var(--font-geist-sans)] h-screen overflow-hidden">
      <div id="canvas-container" className="w-full h-full">
        <UserWrapper />
      </div>
    </div>
  );
}
