async function fetchNews(news) {
  const apiKey = "1a97b38b931648cf924bcdffcb983ea2";
  const apiUrl = `https://newsapi.org/v2/everything?q=${news}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    displayNews(data.articles);

    //  search par upadate  //

    updateHeader(news);

  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById("news_paragraph");
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    const publishedDate = new Date(article.publishedAt);
    const customDate = `${publishedDate.getFullYear()}-${
      publishedDate.getMonth() + 1
    }-${publishedDate.getDate()}`;

    newsCard.innerHTML = `
            <h2>${article.title}</h2>
            ${
              article.urlToImage
                ? `<img src="${article.urlToImage}" alt="News Image">`
                : ""
            }
            <p>${article.description}</p>
            <h3>${article.author}</h3>
            <h3>${article.source.name}</h3>
            <div class = "published">
            <p>Published on :</p>
            <h4> ${customDate}</h4>
            </div>
            <pre onclick="window.open('${
              article.url
            }', '_blank')">Read More -->></pre>
        `;
    newsContainer.appendChild(newsCard);
  });
}

function displayNews(articles) {
  const newsContainer = document.getElementById("news_paragraph");
  newsContainer.innerHTML = "";

  const newsCards = articles.map((article) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    const publishedDate = new Date(article.publishedAt);
    const customDate = `${publishedDate.getFullYear()}-${
      publishedDate.getMonth() + 1
    }-${publishedDate.getDate()}`;

    newsCard.innerHTML = `
      <h2>${article.title}</h2>
      ${
        article.urlToImage
          ? `<img src="${article.urlToImage}" alt="News Image">`
          : ""
      }
      <p>${article.description}</p>
      <h3>${article.author}</h3>
      <h3>${article.source.name}</h3>
      <div class="published">
        <p>Published on :</p>
        <h4> ${customDate}</h4>
      </div>
      <pre onclick="window.open('${article.url}', '_blank')">Read More -->></pre>
    `;

    return newsCard;
  });

  newsCards.forEach((newsCard) => {
    newsContainer.appendChild(newsCard);
  });
}



function updateHeader(news) {
  const header = document.getElementById("subject");
  header.textContent = ` ${news}`;
}

async function fetchDefaultNews() {
  const defaultKeyword = "Cosmology";
  await fetchNews(defaultKeyword);
}

async function searchNews() {
  const news = document.getElementById("searchInput").value;
  if (news.trim() !== "") {
    await fetchNews(news);

    searchInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  const copyrightSection = document.getElementById("copyright-section");
  if (copyrightSection) {
    copyrightSection.innerHTML = `<p>&copy; ${currentYear} Universal News.All Rights Reserved.</p>`;
  }
});

// default load 

window.onload = fetchDefaultNews;
