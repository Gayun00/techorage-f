import React, { useMemo } from "react";
import { Article as ArticleType } from "@/app/types";
import Article from "@/components/Article";
import EmptyArticle from "@/components/fallbacks/EmptyArticle";
import DateSeperator from "../DateSeperator";

interface Props {
  articles: ArticleType[];
  onUpdateKeywords: (url: string) => void;
}

function ArticleList({ articles, onUpdateKeywords }: Props) {
  const renderedElements = useMemo(() => {
    const elements: JSX.Element[] = [];
    let lastDate = "";

    articles.forEach((article, idx) => {
      const articleDate = new Date(article.createdAt).toDateString();
      if (articleDate !== lastDate) {
        elements.push(
          <DateSeperator date={article.createdAt} key={`date-sep-${idx}`} />
        );
        lastDate = articleDate;
      }

      elements.push(
        <Article
          key={article.id}
          id={article.id}
          title={article.title}
          text={article.text}
          url={article.url}
          keywords={article.keywords}
          onUpdateKeywords={onUpdateKeywords}
        />
      );
    });

    return elements;
  }, [articles, onUpdateKeywords]);

  return (
    <div className="mt-6 px-0 grid gap-4 ">
      {!articles?.length && <EmptyArticle />}
      {renderedElements}
    </div>
  );
}

export default ArticleList;
