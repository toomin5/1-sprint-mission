import {
  Product,
  getProductList,
  ElectronicProduct,
  createProduct,
} from "./productService.js";
import { getArticleList, getArticle, Article } from "./articleService.js";

async function createProductInstance() {
  const products = [];
  try {
    // 상품 리스트 가져오기
    const productListData = await getProductList();
    // console.log(productListData.list);
    // products 배열에 담기
    // 객체 리스트 가져온거 반복문써서 돌리기
    // list객체 안에 tags에 ""
    productListData.list.forEach((res) => {
      if (Array.isArray(res.tags) && res.tags.includes("전자제품")) {
        const electronicProduct = new ElectronicProduct(
          res.name,
          res.description,
          res.price,
          res.tags,
          res.images,
          res.favoriteCount,
          res.manufacturer
        );
        products.push(electronicProduct);
      } else {
        const product = new Product(
          res.name,
          res.description,
          res.price,
          res.tags,
          res.images,
          res.favoriteCount
        );
        products.push(product);
      }
    });
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const resultProductsArray = await createProductInstance();
console.log("products:", resultProductsArray);

// //--------------------Article---------------------//

async function createArticleInstace() {
  const articles = [];
  try {
    // article객체 가져오기
    const articleGetList = await getArticleList();
    // console.log(articleGetList);
    articleGetList.list.forEach((art) => {
      const article = new Article(
        art.title,
        art.content,
        art.writer,
        art.likeCount,
        art.image
      );
      articles.push(article);
    });
    return articles;
  } catch (error) {
    console.log(error);
  }
}

const resultArtcilesArray = await createArticleInstace();
console.log("articles: ", resultArtcilesArray);
