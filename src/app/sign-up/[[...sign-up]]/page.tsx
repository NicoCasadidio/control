import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-[#cbd5e1] hover:text-white transition-colors p-2"
      >
        <ArrowLeft size={20} />
        <span className="text-sm">Volver atrás</span>
      </Link>
      <div className="flex justify-center items-center min-h-screen">
        <SignUp />
      </div>
    </div>
  );
}