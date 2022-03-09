const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./mongo");

const getData = async () => {
  let amazonData = [];
  try {
    const response = await axios.get(
      `https://www.amazon.in/s?k=mobile&crid=1CVRSXM8Z5F8Q&sprefix=mobi%2Caps%2C461&ref=nb_sb_ss_ts-doa-p_2_4`
    );
    const $ = cheerio.load(response.data);

    $(".s-asin").each((index, ele) => {
      if (index < 10) {
        let image = $(ele).find(".aok-relative").children().attr("src");
        let title = $(ele).find("span.a-text-normal").text();
        let rating = $(ele).find(".a-icon-star-small").children().text();
        let price = $(ele)
          .find("span.a-text-price")
          .children("span.a-offscreen")
          .text();
        let offerprice = $(ele).find("span.a-price-whole").text();
        amazonData[index] = { image, title, rating, price, offerprice };
      }
    });
    console.log(amazonData);
    db.products.insertMany(amazonData);
  } catch (err) {
    console.log(err);
  }

  let flipKartData = [];
  try {
    const response = await axios.get(
      `https://www.flipkart.com/search?q=mobiles&sid=tyy%2C4io&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_5_na_na_na&as-pos=1&as-type=RECENT&suggestionId=mobiles%7CMobiles&requestId=be7e2d79-51ff-4a1f-ba14-d8af4fd615b3&as-searchtext=mobil`
    );
    const $ = cheerio.load(response.data);
    let count = 0;
    $("._1AtVbE").each((index, ele) => {
      if (count < 10) {
        let image = $(ele).find("._396cs4").attr("src");
        let title = $(ele).find("._4rR01T").text();
        let rating = $(ele).find("span._1lRcqv").children().text();
        let price = $(ele).find("._3I9_wc").text();
        let offerprice = $(ele).find("._30jeq3").text();
        if (price !== "" || title !== "") {
          flipKartData[count] = { image, title, rating, price, offerprice };
          count++;
        }
      }
    });
    console.log(flipKartData);
    db.products.insertMany(flipKartData);
  } catch (err) {
    console.log(err);
  }

  let snapdealData = [];
  try {
    const response = await axios.get(
      `https://www.snapdeal.com/search?keyword=mobile&santizedKeyword=&catId=&categoryId=0&suggested=false&vertical=&noOfResults=20&searchState=&clickSrc=go_header&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=rlvncy`
    );
    const $ = cheerio.load(response.data);
    let count = 0;
    $(".favDp").each((index, ele) => {
      if (count < 10) {
        let image = $(ele).find(".picture-elem source").attr("srcset");
        let title = $(ele).find(".product-title").text();
        let rating = "NA";
        let price = $(ele).find("span.product-desc-price").text();
        let offerprice = $(ele).find("span.product-price").text();
        if (price !== "" || title !== "") {
          snapdealData[count] = { image, title, rating, price, offerprice };
          count++;
        }
      }
    });
    console.log(snapdealData);
    db.products.insertMany(snapdealData);
  } catch (err) {
    console.log(err);
  }
};
module.exports = getData;