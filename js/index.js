// The index.html file has a form with a search input. When the form is submitted, it 
// should take the value of the input and search GitHub for user matches using the 
// User Search Endpoint.

let form = document.getElementById('github-form')
let userList = document.getElementById("user-list")
let repoList = document.getElementById("repos-list")
let listItem = document.createElement("li")
listItem.style.cursor = "pointer"
let listImage = document.createElement("img")


form.addEventListener("submit", getUser) 
listItem.addEventListener("click", getRepos)

// Using the results of the search, display information about the users to the page. 
// (You might include showing their username, avatar and a link to their profile.)

function getUser(e) {
  e.preventDefault();
  let userValue = document.getElementById("search").value;
  fetch(`https://api.github.com/users/${userValue}`)
    .then((resp) => resp.json())
    .then((data) => {
      repoList.append(listItem, listImage);
      listImage.src = data.avatar_url;
      listItem.innerText = `Name: ${data.name} 
                            GitHub Profile: ${data.html_url}

                          `;
    });
}

// Clicking on one of these users should send a request to the User Repos Endpoint and 
// return data about all the repositories for that user.

function getRepos() {
  fetch(
    `https://api.github.com/users/${
      document.getElementById("search").value
    }/repos`
  )
    .then((resp) => resp.json())
    .then((data) => {
      for (const info of data) {
        console.log(info)
        let additionListItem = document.createElement("li")
        additionListItem.innerText = info.name
        repoList.append(additionListItem)
      }
    });
}

// 

// Using the response from the Users Repos Endpoint, display all the repositories for 
// that user on the page.
