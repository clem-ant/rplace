import { getServerSession } from "next-auth";
import Canvas from "./canvas/Canvas";
import UserCount from "./homeUI/userCount";

export default function Home() {
  const session = getServerSession();
  return (
    <div className="font-[family-name:var(--font-geist-sans)] h-screen overflow-hidden">
      <div id="canvas-container" className="w-full h-full">
        <div id="painting" className="w-full h-full">
          <Canvas />
        </div>
        <div className=" text-black absolute top-0 right-0 p-4">
          <span>
            Utilisateurs en ligne : <UserCount />
          </span>
        </div>
      </div>
    </div>
  );
}
