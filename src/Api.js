import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://earlynews.herokuapp.com/api",
});

export const fetchArticles = () => {
  return newsApi.get("/articles").then((res) => {
    return res.data.articles;
  });
};
export const fetchTopics = () => {
  return newsApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const fetchArticlesById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};
