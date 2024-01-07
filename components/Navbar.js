import Button from "@/components/Button";
import * as heroicons from "@heroicons/react/24/solid";
import prisma from "../lib/prisma";

export async function getStaticProps() {
  const categories = await prisma.category.findMany();
  const items = await prisma.item.findMany();

  console.log(categories);
  console.log(items);
  console.log(prisma);

  return {
    props: { categories, items, prisma },
  };
}

export default function Navbar({ children, categories, items, prisma }) {
  console.log(categories, items, prisma);
  return (
    <div className="flex bg-gradient-to-br from-neutral-900 via-zinc-900 to-neutral-800 h-full">
      <div className="p-5 w-48 h-full isolate aspect-video w-96 border-r border-neutral-600 bg-white/10 shadow-lg ring-1 ring-black/5 backdrop-blur-xl flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <heroicons.ListBulletIcon className="text-neutral-900 h-8 bg-white rounded-lg p-1" />
          <h1 className="text-xl text-white font-bold">The List</h1>
        </div>
        {/* {categories.map((category) => {
          <Button
            href={category.id}
            text={category.name}
            icon={category.icon}
          />;
        })} */}
        <Button
          href="new/category"
          text="New Category"
          icon={
            <heroicons.FolderPlusIcon className="text-sky-200 h-8 bg-sky-500 rounded-lg p-1" />
          }
        />
      </div>
      <div className="overflow-y-scroll w-full p-5 scrollbar scrollbar-thin scrollbar-thumb-sky-500">
        {children}
      </div>
    </div>
  );
}
