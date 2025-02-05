import axios from "axios";

export class Product {
  constructor(name, description, price, tags, images, favoriteCount = 0) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this.favoriteCount = favoriteCount;
  }
  favorite() {
    this.favoriteCount += 1;
  }
}

export class ElectronicProduct extends Product {
  constructor(
    name,
    description,
    price,
    tags,
    images,
    favoriteCount,
    manufacturer = ""
  ) {
    super(name, description, price, tags, images, (favoriteCount = 0));
    this.manufacturer = manufacturer;
  }
}

// ---- GET
export async function getProductList(page = 1, pageSize = 10, keyword = "") {
  try {
    const res = await axios.get(
      "https://panda-market-api-crud.vercel.app/products",
      {
        params: {
          page,
          pageSize,
          keyword,
        },
      }
    );

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
}

// getProductList(1, 10, "")
//   .then((getPro) => {
//     console.log(getPro);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// GET(ID)

export async function getProduct(productId) {
  try {
    const res = await axios.get(
      `https://panda-market-api-crud.vercel.app/products/${productId}`
    );
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error("상품을 찾을 수 없습니다.");
    } else {
      console.error(err);
    }
  }
}

// (async () => {
//   const articleId = 1;
//   const article = await getProduct(articleId);
//   console.log(article);
// })();

// // ---- POST

export async function createProduct(price, description, name, tags, images) {
  try {
    const res = await axios.post(
      "https://panda-market-api-crud.vercel.app/products", // URL 다시 확인
      {
        price,
        description,
        name,
        tags,
        images,
      }
    );
    return res.data;
  } catch (error) {
    console.error("API 요청 오류:", error); //
    if (error.response) {
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청 오류:", error.request);
    } else {
      console.error("Error", error.message);
    }
  }
}

// (async () => {
//   const newProducts = {
//     images: ["https://example.com/..."],
//     tags: ["전자제품"],
//     price: 0,
//     description: "string",
//     name: "상품 이름",
//   };
//   try {
//     const products = await createProduct(
//       newProducts.price,
//       newProducts.description,
//       newProducts.name,
//       newProducts.tags,
//       newProducts.images
//     );
//     console.log("생성된 상품:", products);
//   } catch (error) {
//     console.error("상품 생성 중 오류 발생:", error);
//   }
// })();

// ---  PATCH
export async function patchProduct(productId, updates) {
  try {
    const res = await axios.patch(
      `https://panda-market-api-crud.vercel.app/products/${productId}`,
      updates
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

// // (async () => {
// //   const articleId = 1;
// //   const updates = {
// //     title: "수정된 제목",
// //     content: "수정된 내용",
// //   };

// //   const updatedArticle = await patchArticle(articleId, updates);
// //   console.log(updatedArticle);
// // })();

///--- DELETE

export async function deleteProduct(productId) {
  try {
    const res = await axios.delete(
      `https://panda-market-api-crud.vercel.app/products/${productId}`,
      updates
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
// // (async () => {
// //   const productId = 1;
// //   const deleteRes = await deleteProduct(productId);
// //   console.log(deleteRes);
// // })();
