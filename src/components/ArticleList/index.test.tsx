import { customRender } from "@/app/utils/testUtils";
import ArticleList from ".";

const testArticles = [
  {
    id: "d2c0de1c-103c-4c5e-a5bf-c2db4d9dd8d4",
    title: "article1",
    text: "text1",
    url: "url1",
    keywords: ["keyword1"],
    createdAt: new Date("2023-11-19T03:47:33.251Z"),
  },
  {
    id: "d2c0de1c-103c-4c5e-a5bf-c2db4d9dd8d4",
    title: "article2",
    text: "text2",
    url: "url2",
    keywords: ["keyword2"],
    createdAt: new Date("2023-11-20T03:47:33.251Z"),
  },
  {
    id: "d2c0de1c-103c-4c5e-da5bf-c2db4d9dd8d4",
    title: "article3",
    text: "text3",
    url: "url3",
    keywords: ["keyword3"],
    createdAt: new Date("2023-11-20T05:47:33.251Z"),
  },
];

describe("data seperator 렌더링 테스트", () => {
  const setup = () => {
    return customRender(
      <ArticleList onUpdateKeywords={() => {}} articles={testArticles} />
    );
  };
  it("아티클 저장 날짜별 날짜 구분선 렌더링", () => {
    const { getByText } = setup();
    expect(getByText("Sun Nov 19 2023")).toBeDefined();
    expect(getByText("Mon Nov 20 2023")).toBeDefined();
  });
});
