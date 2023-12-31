const taskIdDOM = document.querySelector(".task-edit-id"); 
const taskNameDOM = document.querySelector(".task-edit-name"); 
const editFormDOM = document.querySelector(".single-task-form"); 
const formAlertDOM = document.querySelector(".form-alert"); 

const params = window.location.search;
// console.log(params);
const id = new URLSearchParams(params).get("id");


const showTask = async () => {
    try {
        const { data: task} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id, completed, name} = task;
        taskIdDOM.textContent = _id;
        taskNameDOM.value = name;
    } catch (err) {
        console.log(err);
    }
};
showTask();

// task edit

editFormDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
          });
          formAlertDOM.style.display = "block";
          formAlertDOM.textContent = "編集が完了しました";
          formAlertDOM.classList.add("test-success");

    } catch (err) {
        console.log(err);
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 2000);
});