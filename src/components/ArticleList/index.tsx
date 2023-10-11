import React from "react";
import { Article as ArticleType } from "@/app/types";
import Article from "@/components/Article";
import EmptyArticle from "@/components/fallbacks/EmptyArticle";

interface Props {
  articles: ArticleType[];
  onUpdateKeywords: (url: string) => void;
}

function Articlelist({ articles, onUpdateKeywords }: Props) {
  return (
    <div className="grid gap-4 px-0">
      {!articles?.length && <EmptyArticle />}
      {articles?.map((article, idx) => (
        <Article
          key={idx}
          id={article.id}
          title={article.title}
          text={article.text}
          url={article.url}
          keywords={article.keywords}
          onUpdateKeywords={onUpdateKeywords}
        />
      ))}
    </div>
  );
}

export default Articlelist;
