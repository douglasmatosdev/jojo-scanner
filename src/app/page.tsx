'use client'
import { Scan } from "@/components/Scan";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">

    <h1 className=" text-2xl">ESCANEAR CÓDIGO</h1>
      <Scan />
    </div>
  );
}
