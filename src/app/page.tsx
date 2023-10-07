"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useArticleQuery,
  useKeywordsQuery,
  useSubmitArticleMutation,
} from "./queries";
import Article from "@/components/Article";
import EmptyArticle from "@/components/fallbacks/EmptyArticle";
import Keywords from "@/components/Keywords";
import ArticleUrlInput from "@/components/ArticleUrlInput";

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

          <CardContent className="grid gap-4 px-0">
            {!articles.data?.length && <EmptyArticle />}
            {articles.data?.map((article, idx) => (
              <Article
                key={idx}
                id={article.id}
                title={article.title}
                text={article.text}
                url={article.url}
                keywords={article.keywords}
                thumbnail={article.thumbnail}
              />
            ))}
          </CardContent>
        </CardContent>
      </Card>
    </main>
  );
}
