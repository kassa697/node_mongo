
const tasksDom = document.querySelector(".tasks");
const formDom = document.querySelector(".task-form");
const taskInputDom = document.querySelector(".task-input");
const formAlertDom = document.querySelector(".form-alert");

const showTasks = async () => {
    try {
const {data: tasks} = await axios.get("/api/v1/tasks");

// when no tasks
if (tasks.length === 0) {
    tasksDom.innerHTML = `
    <h5 class="empty-list">no tasks</h5>
    `;
    return;
}
const allTasks = tasks.map((task) => {
    console.log(task);
    const {completed, _id, name} = task;
    return `<div class="single-task">
    <h5>
        <span>  <i class="far fa-check-circle"></i></span>${name}
    </h5>
    <div class="task-links">
   <!-- 編集リンク-->
    <a href="edit.html?id=${_id}" class="edit-link">
       <i class="fas fa-edit"></i>
    </a>
   <!-- ゴミ箱リンク-->
    <button type="button" class="delete-btn" data-id="${_id}">

       <i class="fas fa-trash"></i>
    </button>
   </div>          
</div>`;
}).join("");
tasksDom.innerHTML = allTasks;
    } catch (err) {
        console.error(err);
    }
};

showTasks();

// new task

formDom.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDom.value;

    try {
        await axios.post("/api/v1/tasks", {name: name});
        showTasks();
        taskInputDom.value = "";
        formAlertDom.style.display = "block";
        formAlertDom.textContent = "タスクを追加しました。";
        formAlertDom.classList.add("text-success");

    } catch (err) {
        console.error(err);
        formAlertDom.style.display = "block";
        formAlertDom.innerHTML = "無効です。";
    }
    setTimeout(() => {
        formAlertDom.style.display = "none";
        formAlertDom.classList.remove("text-success");
    }, 3000);
});

// task delete
tasksDom.addEventListener("click", async (event) => {
    const element = event.target;
    
    if (element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        console.log(id);
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err)
         {console.log(err)}
    }
});