"use client";


import { useModal } from "@/hooks/use-modal-store";
import { User2, UserPlus2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const AuthModal = () => {
  const { isOpen, data, type, onClose } = useModal();
  const router = useRouter();

  const { redirectUrl } = data;

  return (
    <Modal
      open={isOpen && type === "AUTH_MODAL"}
      title="Login or Create a new Account"
      description="This continue the action you must be log in or create a new accont."
      className="max-w-[400px]"
    >
      <div
        className="flex gap-5 mt-10"
        onClick={() => {
          router.push(`/sign-up?redirect_url=${redirectUrl || "/"}`);
          onClose();
        }}
      >
        <Button variant="outline" className="w-full">
          <UserPlus2 className="h-4 w-4 mr-2" />
          Sign up
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            router.push(`/sign-in?redirect_url=${redirectUrl || "/"}`);
            onClose();
          }}
        >
          <User2 className="h-4 w-4 mr-2" />
          Log in
        </Button>
      </div>
    </Modal>
  );
};
