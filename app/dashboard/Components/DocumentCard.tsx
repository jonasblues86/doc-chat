import { DocumentStatus } from "@/enums";
import Badge from "@/Components/atoms/statusBadge/Badge";
import Icon from "@/Components/atoms/Icons/Icon";
import { IconVariant } from "@/enums";
import { Document } from "@prisma/client";
import Link from "next/link";

const DocumentCard = ({ item, index }: { item: Document; index: number }) => {
  const fileSize = (item.fileSize / 1024 / 1024).toFixed(2);
  return (
    <Link href={`/document/${item.id}`}>
      <div
        key={index}
        className="relative hover:shadow-md transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 flex flex-col gap-4 text-left bg-white border-gray-200 border rounded-xl pt-5 pr-5 pb-5 pl-5 shadow-sm"
      >
        {/* Status Badge */}
        <Badge status={item.status as DocumentStatus} />
        {/* Options Button */}
        <div className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
          <Icon variant={IconVariant.OPTIONS} height={20} width={20} />
        </div>
        <div className="flex items-center gap-3 pt-2">
          {/* Details */}

          <div className="bg-indigo-50 rounded-lg pt-3 pr-3 pb-3 pl-3">
            <Icon variant={IconVariant.FILES} height={20} width={20} />
          </div>
          <div>
            <span className="text-lg font-semibold tracking-tight block">
              {item.fileName}
            </span>
            <span className="text-sm text-gray-500 block">{fileSize} MB</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DocumentCard;
