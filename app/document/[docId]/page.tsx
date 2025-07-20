const DocumentPage = async ({
  params,
}: {
  params: Promise<{ docId: string }>;
}) => {
  const { docId } = await params;
  return <div>Document Page {docId}</div>;
};

export default DocumentPage;
