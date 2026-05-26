export default async function Page({
	params,
}: Readonly<{
	params: Promise<{ slug: string }>;
}>) {
	const { slug } = await params;

	return <div className="grid flex-1 place-items-center">{slug}</div>;
}
