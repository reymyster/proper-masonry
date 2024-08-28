import { ChevronDownIcon } from "lucide-react";
import { type MenuItem, AccountingMenuData } from "@/data/menu";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <Menu data={AccountingMenuData} />
    </main>
  );
}

function Menu({ data }: { data: MenuItem[] }) {
  return (
    <div className="@container/menu">
      {data.map((item) => (
        <TopLevelMenu key={item.title} data={item} />
      ))}
    </div>
  );
}

function TopLevelMenu({ data }: { data: MenuItem }) {
  return (
    <div className={cn("w-[300px]")}>
      <DisplayMenuItem
        data={data}
        className={cn(
          "font-bold text-black",
          data.children && data.children.length > 0
            ? "cursor-default"
            : "cursor-pointer",
        )}
      />
      {data.children?.map((child) => (
        <SecondLevelMenu data={child} key={child.title} />
      ))}
    </div>
  );
}

const baseMenuItemClasses =
  "h-[35px] cursor-pointer select-none py-2 text-stone-500";

function SecondLevelMenu({ data }: { data: MenuItem }) {
  if ((data.children?.length ?? 0) > 0) {
    return (
      <details>
        <summary
          className={cn(baseMenuItemClasses, "flex flex-row justify-between")}
        >
          {data.title}
          <ChevronDownIcon />
        </summary>
        {data.children?.map((child) => (
          <DisplayMenuItem key={child.title} data={child} className="ml-4" />
        ))}
      </details>
    );
  }

  return <DisplayMenuItem data={data} />;
}

function DisplayMenuItem({
  data,
  className,
}: {
  data: MenuItem;
  className?: string;
}) {
  return <div className={cn(baseMenuItemClasses, className)}>{data.title}</div>;
}
