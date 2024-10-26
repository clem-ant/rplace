import { getServerSession } from "next-auth";
import Canvas from "./canvas/Canvas";

export default function Home() {
  const session = getServerSession();
  return (
    <div className="font-[family-name:var(--font-geist-sans)] h-screen overflow-hidden">
      <div id="canvas-container" className="w-full h-full">
        <div id="painting" className="w-full h-full">
          <div id="painting zoom">
            <div id="painting-move">
              <Canvas />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
