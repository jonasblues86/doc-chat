"use client";
import Button from "../Button/Button";
import { ButtonVariant } from "@/enums";
import { useRef, useEffect } from "react";

export default function Tooltip({
  items,
  open,
  setOpen,
}: {
  items: { name: string; onClick: () => void }[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          tooltipRef.current &&
          !tooltipRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, setOpen]);
  return (
    open && (
      <div
        ref={tooltipRef}
        className="absolute top-0 left-full bg-white shadow-md border-gray-200 border rounded-lg text-sm"
      >
        {items.map((item, index) => (
          <TooltipItem key={index} name={item.name} onClick={item.onClick} />
        ))}
      </div>
    )
  );
}

const TooltipItem = ({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) => {
  return (
    <Button
      variant={ButtonVariant.VANILLA}
      className="flex px-2 py-1 w-full text-sm items-center gap-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
