import React, { useEffect } from "react";

interface Props {
  id: string;
  title: string;
  text: string;
  url?: string;
  keywords: string[];
  onUpdateKeywords: (id: string) => void;
}

function Article({ title, text, url, id, keywords, onUpdateKeywords }: Props) {
  const handleArticleClick = () => {
    if (!url) return;
    window.open(url);
  };

  useEffect(() => {
    if (!id) return;
    if (keywords?.length) return;
    onUpdateKeywords(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!keywords?.length && <button onClick={() => {}}>키워드 분석하기</button>}
      <div
        onClick={handleArticleClick}
        key={title}
        className={`flex items-center space-x-4 rounded-md border p-4 m-0 ${
          url ? "cursor-pointer" : ""
        }`}>
        <div className="flex-1 space-y-1 w-20">
          <p className="text-sm font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </p>
          <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
            {text.slice(50, 100)}
          </p>
        </div>
      </div>
    </>
  );
}

export default Article;
