"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useArticleQuery,
  useKeywordsQuery,
  useSubmitArticleMutation,
  useUpdateArticleKeywordsMutation,
} from "./queries";

import Keywords from "@/components/Keywords";
import ArticleUrlInput from "@/components/ArticleUrlInput";
import Articlelist from "@/components/ArticleList";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const articles = useArticleQuery();
  const keywords = useKeywordsQuery();
  const submitArticleMutation = useSubmitArticleMutation();
  const articleKeywordsMutation = useUpdateArticleKeywordsMutation();
  const session = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("api/auth/signin");
      return;
    }
  }, [session]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {mounted && (
        <div className="flex flex-col justify-center w-full">
          <p>user</p>

          <div className="flex justify-between items-center">
            {session.status === "authenticated" && (
              <p>{session.data.user?.name}</p>
            )}
            <Button variant="ghost" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Enter url</CardTitle>
        </CardHeader>

        <CardContent>
          <ArticleUrlInput mutation={submitArticleMutation} />
          <Keywords
            keywords={keywords.data || []}
            isExtracting={articleKeywordsMutation.isLoading}
          />

          <Articlelist
            articles={articles?.data || []}
            onUpdateKeywords={(id: string) =>
              articleKeywordsMutation.mutate(id)
            }
          />
        </CardContent>
      </Card>
    </main>
  );
}
