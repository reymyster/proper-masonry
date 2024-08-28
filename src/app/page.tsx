import { ChevronDownIcon } from "lucide-react";
import { type MenuItem, AccountingMenuData } from "@/data/menu";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="@container/menu flex min-h-screen flex-col items-center p-4">
      <Menu data={AccountingMenuData} />
    </main>
  );
}

/*
  these should be told to tailwind more explicitly, just doing this for now

  @[632px]/menu:grid
  @[948px]/menu:grid
  @[1264px]/menu:grid
  @[1580px]/menu:grid
  @[1896px]/menu:grid
  @[2212px]/menu:grid
  @[2258px]/menu:grid
  @[2844px]/menu:grid
  @[3160px]/menu:grid

  @[632px]/menu:grid-cols-2
  @[948px]/menu:grid-cols-3
  @[1264px]/menu:grid-cols-4
  @[1580px]/menu:grid-cols-5
  @[1896px]/menu:grid-cols-6
  @[2212px]/menu:grid-cols-7
  @[2258px]/menu:grid-cols-8
  @[2844px]/menu:grid-cols-9
  @[3160px]/menu:grid-cols-10


  @[632px]/menu:hidden
  @[948px]/menu:hidden
  @[1264px]/menu:hidden
  @[1580px]/menu:hidden
  @[2212px]/menu:hidden
  @[2258px]/menu:hidden
  @[1896px]/menu:hidden
  @[2844px]/menu:hidden
  @[3160px]/menu:hidden
*/

function Menu({ data }: { data: MenuItem[] }) {
  const columnWidthPreHorizontalSpacing = 300;
  const columnWidth = columnWidthPreHorizontalSpacing + 16;
  const maxScreenWidth = 3200;
  const maxColumns = Math.floor(maxScreenWidth / columnWidth);

  const containers = Array(maxColumns)
    .fill(0)
    .map((_, mcIdx) => {
      const columnsInThisContainer = mcIdx + 1;
      if (columnsInThisContainer === 1) {
        // base case
        return (
          <div key={mcIdx} className="@[632px]/menu:hidden">
            {data.map((menu, idx) => (
              <TopLevelMenu key={idx} data={menu} />
            ))}
          </div>
        );
      } else {
        const thisBreakpoint = `@[${columnWidth * columnsInThisContainer}px]/menu`;
        const nextBreakpoint = `@[${columnWidth * (columnsInThisContainer + 1)}px]/menu`;
        const columns = Array(columnsInThisContainer)
          .fill(0)
          .map((_, column) => ({ column, count: 0, items: [] as MenuItem[] }));

        for (let i = 0; i < data.length; i++) {
          const nextAvailableColumn = columns.toSorted((a, b) =>
            a.count === b.count ? a.column - b.column : a.count - b.count,
          )[0];
          nextAvailableColumn.count += 2 + (data[i].children?.length ?? 0);
          nextAvailableColumn.items.push(data[i]);
        }
        return (
          <div
            key={mcIdx}
            className={cn(
              "hidden",
              `${thisBreakpoint}:grid ${thisBreakpoint}:grid-cols-${columnsInThisContainer} gap-x-8`,
              `${nextBreakpoint}:hidden`,
            )}
          >
            {columns.map((col) => (
              <div key={col.column} className="flex flex-col">
                {col.items.map((item) => (
                  <TopLevelMenu key={item.title} data={item} />
                ))}
              </div>
            ))}
          </div>
        );
      }
    });

  return containers;
}

function TopLevelMenu({
  data,
  className,
}: {
  data: MenuItem;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 w-[300px]", className)}>
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
          <ChevronDownIcon className="mr-4" />
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
