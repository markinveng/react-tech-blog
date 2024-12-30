import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// microCMS で更新された記事IDなどを受け取り、対象パスを再検証する
export async function POST(req: NextRequest): Promise<NextResponse> {
  // セキュリティ対策: クエリパラメータなどでsecretを確認
  const secret: string | null = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // microCMSから送られてくるボディ例: { "type":"blog", "id":"abc123" }
  const body: { type: string; id: string } = await req.json();
  const { type, id } = body;

  try {
    // 1) 一覧ページを再検証
    if (type === "blog") {
      revalidatePath("/blog");
      if (id) {
        // 2) 動的詳細ページも再検証
        revalidatePath(`/blog/${id}`);
      }
    } else if (type === "works") {
      revalidatePath("/works");
      if (id) {
        revalidatePath(`/works/${id}`);
      }
    }
    // 必要に応じて他のケースや複数IDに対応

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Revalidation error" }, { status: 500 });
  }
}
