"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { type MenuItem, AccountingMenuData } from "@/data/menu";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  // doing this because toSorted doesn't work on server side yet?
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <main className="@container/menu flex min-h-screen flex-col p-4">
      <Menu data={AccountingMenuData} />
    </main>
  );
}

/*
  @[632px]/menu:grid-cols-2
    @[632px]/menu:col-start-1
    @[632px]/menu:col-start-2
  @[948px]/menu:grid-cols-3
    @[948px]/menu:col-start-1
    @[948px]/menu:col-start-2
    @[948px]/menu:col-start-3
  @[1264px]/menu:grid-cols-4
    @[1264px]/menu:col-start-1
    @[1264px]/menu:col-start-2
    @[1264px]/menu:col-start-3
    @[1264px]/menu:col-start-4
  @[1580px]/menu:grid-cols-5
    @[1580px]/menu:col-start-1
    @[1580px]/menu:col-start-2
    @[1580px]/menu:col-start-3
    @[1580px]/menu:col-start-4
    @[1580px]/menu:col-start-5
  @[1896px]/menu:grid-cols-6
    @[1896px]/menu:col-start-1
    @[1896px]/menu:col-start-2
    @[1896px]/menu:col-start-3
    @[1896px]/menu:col-start-4
    @[1896px]/menu:col-start-5
    @[1896px]/menu:col-start-6
  @[2212px]/menu:grid-cols-7
  @[2258px]/menu:grid-cols-8
  @[2844px]/menu:grid-cols-9
  @[3160px]/menu:grid-cols-10

*/

function Menu({ data }: { data: MenuItem[] }) {
  const columnWidthPreHorizontalSpacing = 300;
  const columnWidth = columnWidthPreHorizontalSpacing + 16;
  const maxScreenWidth = 3200;
  const maxColumns = Math.floor(maxScreenWidth / columnWidth);

  // skipping col 1 since that's the default / don't need to process it
  const colScenarios = Array(maxColumns)
    .fill(0)
    .map((_, i) => i + 1)
    .filter((v) => v > 1);
  const breakpoints = colScenarios.map((col) => ({
    selector: `@[${columnWidth * col}px]/menu`,
    number: col,
  }));

  const gridColumnSetup = breakpoints
    .map((c) => `${c.selector}:grid-cols-${c.number}`)
    .join(" ");

  const colPlacements = breakpoints.map((col) => {
    const holder = Array(col.number)
      .fill(0)
      .map((_, i) => ({ index: i + 1, count: 0 }));

    const map = new Map<number, number>();

    for (let i = 0; i < data.length; i++) {
      const nextAvailableColumn = holder.toSorted((a, b) =>
        a.count === b.count ? a.index - b.index : a.count - b.count,
      )[0];
      map.set(i, nextAvailableColumn.index);
      nextAvailableColumn.count += 2 + (data[i].children?.length ?? 0);
    }

    return map;
  });

  console.log({ colPlacements });

  return (
    <div className={cn("grid grid-rows-1", gridColumnSetup)}>
      {data.map((item, idx) => {
        const placements = breakpoints
          .map((col, colIdx) => {
            const place = colPlacements[colIdx].get(idx);
            return `${col.selector}:col-start-${place}`;
          })
          .join(" ");

        // const orig = `@[300px]/menu:col-start-1 @[600px]/menu:col-start-2`;

        return <TopLevelMenu key={idx} data={item} className={placements} />;
      })}
    </div>
  );
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
