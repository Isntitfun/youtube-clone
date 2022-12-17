const video = document.getElementById("video-container");
const commentForm = document.getElementById("comment__form");
const commentInput = commentForm.querySelector("textarea");
const commentDisplay = document.getElementById("comment__display");
const commentDeleteBtn = document.querySelectorAll(".fa-trash-can");
const commentEditBtn = document.querySelectorAll(".editBtn");

const createComment = (commentJSON) => {
  const comment = document.createElement("div");
  comment.className = "comment__container";
  comment.dataset.id = commentJSON._id;

  const commentImg = document.createElement("img");
  commentImg.setAttribute(
    "src",
    `${
      commentJSON.owner.socialOnly
        ? commentJSON.owner.avatar
        : "/" + commentJSON.owner.avatar
    }`
  );
  commentImg.className = "comment__avatar";
  commentImg.setAttribute("crossorigin", "anonymous");
  comment.appendChild(commentImg);
  const commentContainer = document.createElement("div");
  commentContainer.className = "comment";
  const commentName = document.createElement("span");
  commentName.innerText = commentJSON.owner.name;
  const commentText = document.createElement("textarea");
  commentText.value = commentJSON.text;
  // commentText.setAttribute("readonly", "true");
  commentText.setAttribute("oninput", "auto_grow(this)");
  commentText.setAttribute("readonly", "true");
  commentContainer.appendChild(commentName);
  commentContainer.appendChild(commentText);
  const commentBtn = document.createElement("div");
  commentBtn.className = "comment__btn";
  const commentEditBtn = document.createElement("i");
  commentEditBtn.classList.add("fa-regular");
  commentEditBtn.classList.add("fa-pen-to-square");
  commentEditBtn.addEventListener("click", handleEditComment);
  const commentDeleteBtn = document.createElement("i");
  commentDeleteBtn.classList.add("fa-regular");
  commentDeleteBtn.classList.add("fa-trash-can");
  commentDeleteBtn.addEventListener("click", handleDeleteComment);
  commentBtn.appendChild(commentEditBtn);
  commentBtn.appendChild(commentDeleteBtn);
  commentContainer.appendChild(commentBtn);
  comment.appendChild(commentContainer);
  commentDisplay.prepend(comment);
};
const deleteComment = (target) => {
  commentDisplay.removeChild(target);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = commentInput.value;
  if (text !== "") {
    const response = await fetch(`/api/commentapi/${video.dataset.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    commentInput.value = "";

    if (response.status === 201) {
      let commentJSON = await response.json();
      commentJSON = commentJSON.comment;
      createComment(commentJSON);
    }
  }
};

const handleDeleteComment = async (event) => {
  const target = event.target.parentElement.parentElement.parentElement;
  const targetID = target.dataset.id;
  const response = await fetch(`/api/deletecommentapi/${targetID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: targetID }),
  });
  if (response.status === 200) {
    deleteComment(target);
  }
};

const handleSubmitComment = async (event) => {
  const target = event.target;
  const targetText =
    event.target.parentElement.parentElement.querySelector("textarea");
  const editedText = targetText.value;
  const commentID =
    event.target.parentElement.parentElement.parentElement.dataset.id;

  const response = await fetch(`/api/editcommentapi/${commentID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: targetText.value }),
  });
  if (response.status === 200) {
    targetText.setAttribute("readonly", "true");
    target.classList.remove("fa-square-arrow-up-right");
    target.classList.remove("fa-solid");
    target.classList.add("fa-pen-to-square");
    target.classList.add("fa-regular");
    target.removeEventListener("click", handleSubmitComment);
    target.addEventListener("click", handleEditComment);
    targetText.value = editedText;
  }
};

const handleEditComment = async (event) => {
  const target = event.target;
  const targetText =
    event.target.parentElement.parentElement.querySelector("textarea");
  targetText.removeAttribute("readonly");
  target.classList.remove("fa-regular");
  target.classList.remove("fa-pen-to-square");
  target.classList.add("fa-solid");
  target.classList.add("fa-square-arrow-up-right");
  target.removeEventListener("click", handleEditComment);
  target.addEventListener("click", handleSubmitComment);
};

commentForm.addEventListener("submit", handleSubmit);
commentDeleteBtn.forEach((element) => {
  element.addEventListener("click", handleDeleteComment);
});
commentEditBtn.forEach((element) => {
  element.addEventListener("click", handleEditComment);
});
