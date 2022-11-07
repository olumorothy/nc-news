import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://earlynews.herokuapp.com/api",
});

export const fetchArticles = (sortBy, order) => {
  return newsApi
    .get(`/articles?sort_by=${sortBy}&order=${order}`)
    .then((res) => {
      return res.data.articles;
    })
    .catch((err) => {
      console.log(err);
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

export const patchArticlesById = (article_id, value) => {
  return newsApi
    .patch(`/articles/${article_id}`, { inc_votes: value })
    .then((res) => {
      return res.data;
    });
};

export const fetchCommentByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const postCommentByArticleId = (id, user, comment) => {
  const commentData = {
    username: user,
    body: comment,
  };
  return newsApi.post(`/articles/${id}/comments`, commentData).then((res) => {
    return res.data.comment;
  });
};

export const fetchAllUsers = () => {
  return newsApi.get("/users").then((res) => {
    return res.data;
  });
};

export const deleteCommentById = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`).then((res) => {
    return res.data.comment;
  });
};
