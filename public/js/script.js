const form = document.querySelector(".form");
const inputTitle = document.querySelector(".input__title");
const inputDescription = document.querySelector(".input__description");
const inputCheckbox = document.querySelector(".input__checkbox");
const btnSubmitByEdit = document.querySelector(".btn__submit-by-edit");
const btnSubmit = document.querySelector(".btn__submit");

const errorTitleDesc = document.querySelector(".error__title-description");

let todoList = document.querySelector(".todo__list");

const getTodo = async (id) => {
  const data = [];
  await fetch("/api/v1/todos/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(res => res.json())
    .then(d => data.push(d));
  return data;
}

const deleteTodo = async (id) => {
  await fetch("/api/v1/todos/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

// Create a new todo when submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodo = {
    title: inputTitle.value,
    description: inputDescription.value,
    completed: inputCheckbox.checked,
  }

  if (inputTitle.value === "" || inputDescription.value === "") {
    errorTitleDesc.innerHTML = "Input and Description must be filled";
  }

  try {
    await fetch("/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
  } catch (error) {
    console.log({ message: error.message });
  }
})

// Show all todos
window.addEventListener("load", async (e) => {
  e.preventDefault();
  todoData = [];
  btnSubmitByEdit.classList.add("hide");

  try {
    await fetch("/api/v1/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(data => { todoData.push(...data) });

    todoData.map(todo => {
      todoList.innerHTML +=
        `
        <div class="todo">
          <p class="todo_id">${todo._id}</p>
          <h3 class="todo__title">${todo.title}</h3>
          <p class="todo__description">${todo.description}</p>
          <p class="todo__completed">${todo.completed ? "completed" : "not complete"}</p>
          <button class="btn__todo-edit">Edit</button>
          <button class="btn__todo-delete">Delete</button>
        </div>
        `
    })

    const todoEdit = document.querySelectorAll(".btn__todo-edit");
    const todoDelete = document.querySelectorAll(".btn__todo-delete");

    // Delete todo
    todoDelete.forEach(tdelete => tdelete.addEventListener("click", () => {
      const id = tdelete.parentElement.firstChild.nextSibling.innerHTML;
      const confirmation = confirm("You want delete this todo?");
      if (confirmation) {
        deleteTodo(id);
        window.location.reload();
      }
    }))

    // Edit todo
    todoEdit.forEach(tedit => tedit.addEventListener("click", async () => {
      btnSubmitByEdit.classList.remove("hide");
      btnSubmit.classList.add("hide");
      const id = tedit.parentElement.firstChild.nextSibling.innerHTML;

      const result = await getTodo(id);
      inputTitle.value = result[0].title;
      inputDescription.value = result[0].description;

      btnSubmitByEdit.addEventListener("click", async (e) => {
        e.preventDefault();

        const updatedTodo = {
          title: inputTitle.value,
          description: inputDescription.value,
          completed: inputCheckbox.checked,
        }

        console.log(updatedTodo);

        await fetch(`/api/v1/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedTodo)
        })
          .then(res => res.json())
          .then(data => console.log(data))
          .then(() => window.location.reload());
      })
    }))
  } catch (error) {
    console.log({ message: error.message });
  }
})

