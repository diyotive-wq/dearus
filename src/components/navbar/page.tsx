import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex flex-row py-2 px-4 items-center">
      <div className="relative w-36 aspect-[16/4.5]">
        <Image src={"/assets/icons/logo.svg"} alt="Logo" fill />
      </div>
      {/* <div className="flex flex-row justify-end flex-1 gap-4">
        <div className="text-md font-medium">Login</div>
      </div> */}
    </div>
  );
}
