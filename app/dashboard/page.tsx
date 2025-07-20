import ReactDropZone from "@/Components/molecules/ReactDropZone/ReactDropZone";
import { DocumentStatus, IconVariant } from "@/enums";
import DashboardDetailsCard from "./Components/DashboardDetailsCard";
import DocumentCard from "./Components/DocumentCard";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
const DashboardPage = async () => {
  const session = await getServerSession();
  const userId = session?.user.id;
  const recentDocs = await prisma.document.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const DocumentCardDetails = [
    {
      title: "Total Documents",
      subtitle: `${recentDocs.length}`,
      icon: IconVariant.FILES,
    },
    {
      title: "Storage Used",
      subtitle: `${(
        recentDocs.reduce((total, doc) => total + doc.fileSize, 0) /
        1024 /
        1024
      ).toFixed(2)} MB`,
      icon: IconVariant.DATABASE,
    },
    {
      title: "Average Processing Time",
      subtitle: "1m 45s",
      icon: IconVariant.TIME,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto lg:px-8 pt-10 pr-6 pb-10 pl-6">
      {/* Dashboard Document Details */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DocumentCardDetails.map((item, index) => (
          <DashboardDetailsCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* DropZone */}
      <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight">Quick Uploads</h2>
        <p className="text-sm text-gray-500">
          Drag and drop files here or click to upload
        </p>

        <ReactDropZone />
      </div>

      <h2 className="mt-10 mb-6 text-lg font-semibold tracking-tight">
        Recent Uploads
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recentDocs.slice(0, 3).map((item, index) => (
          <DocumentCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
