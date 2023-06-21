async function fetchMyQiitaPosts() {
  const TOKEN = "84fe82ba4c967f2b44ed724cda50942e11425381";
  const url = "https://qiita.com/api/v2/authenticated_user/items";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  let response = await fetch(url, options);

  if (response.ok) {
    let json = await response.json();
    let postsList = document.getElementById("qiita-posts");

    for (let post of json) {
      console.log("post: ", post);

      let listItem = document.createElement("li");

      let createdAtDate = new Date(post.created_at);
      let updatedAtDate = new Date(post.updated_at);
      let formattedCreatedAt = createdAtDate.toLocaleDateString();
      let formattedUpdatedAt = updatedAtDate.toLocaleDateString();

      let textNode = document.createTextNode(
        `${post.title} (作成日: ${formattedCreatedAt}, 更新日: ${formattedUpdatedAt})`
      );

      listItem.appendChild(textNode);
      postsList.appendChild(listItem);
    }
  } else {
    console.log("HTTP-Error: " + response.status);
  }
}

fetchMyQiitaPosts();
