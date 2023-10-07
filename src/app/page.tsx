"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useArticleQuery,
  useKeywordsQuery,
  useSubmitArticleMutation,
} from "./queries";

import Keywords from "@/components/Keywords";
import ArticleUrlInput from "@/components/ArticleUrlInput";
import Articlelist from "@/components/ArticleList";

export default function Home() {
  const articles = useArticleQuery();
  const keywords = useKeywordsQuery();
  const submitArticleMutation = useSubmitArticleMutation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Enter url</CardTitle>
        </CardHeader>

        <CardContent>
          <ArticleUrlInput mutation={submitArticleMutation} />
          <Keywords keywords={keywords.data || []} />

          <Articlelist articles={articles?.data || []} />
        </CardContent>
      </Card>
    </main>
  );
}
