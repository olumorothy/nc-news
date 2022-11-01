import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://earlynews.herokuapp.com/api",
});

export const fetchArticles = () => {
  return newsApi.get("/articles").then((res) => {
    return res.data;
  });
};
