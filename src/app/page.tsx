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
import { Badge } from "@/components/ui/badge";
import { STORAGE_KEY } from "./constants";
import Link from "next/link";

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
    if (session.data?.token) {
      localStorage.setItem(STORAGE_KEY.TOKEN, session.data?.token);
    }
  });

  return (
    <Card>
      <CardHeader>
        {mounted && (
          <div className="pb-5 flex flex-col justify-center w-full">
            <div className="flex justify-between items-center">
              {session.status === "authenticated" && (
                <Badge variant="outline" className="px-5 h-8 text-xs">
                  {session.data.user?.name}
                </Badge>
              )}
              <Button
                className="h-8 text-xs"
                variant="secondary"
                onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          </div>
        )}
        <CardTitle>Enter url</CardTitle>
      </CardHeader>

      <CardContent>
        <ArticleUrlInput mutation={submitArticleMutation} />
        <Link href="weekly-articles">
          <Button variant="secondary" className="mt-4">
            주간 아티클 모아보기
          </Button>
        </Link>

        <Articlelist
          articles={articles?.data || []}
          onUpdateKeywords={(id: string) => articleKeywordsMutation.mutate(id)}
        />
      </CardContent>
    </Card>
  );
}
