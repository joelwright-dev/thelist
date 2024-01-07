import Link from "next/link";

export default function Button({ href, text, icon }) {
  return (
    <Link href={href} className="flex gap-3 items-center">
      {icon}
      <p className="text-white">{text}</p>
    </Link>
  );
}
