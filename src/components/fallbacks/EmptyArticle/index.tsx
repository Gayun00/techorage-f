import Article from "@/components/Article";
import React from "react";

function EmptyArticle() {
  return (
    <Article
      title="새로운 아티클을 모아보세요"
      text="키워드 별로 정리된 아티클을 언제든지 꺼내볼 수 있어요"
      url=""
      thumbnail=""
    />
  );
}

export default EmptyArticle;
