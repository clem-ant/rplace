import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginBtn({ setIsModalOpen }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button onClick={() => signOut()}>Se déconnecter</Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Se connecter</Button>
    </>
  );
}
