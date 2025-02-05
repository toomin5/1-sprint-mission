import axios from "axios";

export class Article {
  constructor(title, content, writer, likeCount = 0, image) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.image = image;
    this.likeCount = likeCount;
    this.createAt = new Date();
  }
  like() {
    this.likeCount++;
  }
}

export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  return axios // `axios.get` 호출 결과를 반환해야 함
    .get("https://panda-market-api-crud.vercel.app/articles", {
      params: {
        page,
        pageSize,
        keyword,
      },
    })
    .then((res) => {
      return res.data; // 응답 데이터 반환
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error; // 에러를 호출자에게 전달
    });
}

// ---- GET

// (async () => {
//   try {
//     const articles = await getArticleList(1, 10, ""); // 결과를 받음
//     console.log("Fetched articles:", articles); // 결과 출력
//   } catch (error) {
//     console.error("Error fetching articles:", error);
//   }
// })();

// getArticleList(1, 10, "")
//   .then((articleList) => {
//     console.log(articleList);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export function getArticle(articleId) {
  axios
    .get(`https://panda-market-api-crud.vercel.app/articles/${articleId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

// const articleId = 110;
// getArticle(articleId)
//   .then((article) => {
//     console.log(article);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// (async () => {
//   const articleId = 110;
//   const article = await getArticle(articleId);
//   console.log(article);
// })();

// // ---- POST

export function createArticle(title, content, image) {
  axios
    .post("https://panda-market-api-crud.vercel.app/articles", {
      title,
      content,
      image,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.err(err);
    });
}

// const newArticle = {
//   title: "새로운글",
//   content: "새로운내용",
//   image: "https://example.com/...",
// };
// createArticle(newArticle.title, newArticle.content, newArticle.image)
//   .then((postArticle) => {
//     console.log(postArticle);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // (async () => {
// //   const newArticle = {
// //     title: "새로운글",
// //     content: "새로운내용",
// //     image: "https://example.com/...",
// //   };
// //   const article = await createArticle(
// //     newArticle.title,
// //     newArticle.content,
// //     newArticle.image
// //   );
// //   console.log(article);
// // })();

// ---  PATCH
export function patchArticle(articleId, updates) {
  axios
    .patch(
      `https://panda-market-api-crud.vercel.app/articles/${articleId}`,
      updates
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
}

// const updates = {
//   title: "수정된 제목",
//   content: "수정된 내용",
// };
// const articleId = 110;
// patchArticle(articleId, updates)
//   .then((patched) => {
//     console.log(patched);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // (async () => {
// //   const articleId = 1;
// //   const updates = {
// //     title: "수정된 제목",
// //     content: "수정된 내용",
// //   };

// //   const updatedArticle = await patchArticle(articleId, updates);
// //   console.log(updatedArticle);
// // })();

// ///--- DELETE

export function deleteArticle(articleId) {
  axios
    .delete(`https://panda-market-api-crud.vercel.app/articles/${articleId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

// const articleId = 110;
// deleteArticle(articleId)
//   .then((deleted) => {
//     console.log(deleted); // 삭제된 게시글 결과 출력
//   })
//   .catch((err) => {
//     console.error(err); // 에러 처리
//   });

// (async () => {
//   const articleId = 1;
//   const deleteRes = await deleteArticle(articleId);
//   console.log(deleteRes);
// })();
