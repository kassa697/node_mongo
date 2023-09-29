

const showTasks = async () => {
    try {
const {data: tasks} = await axios.get("/api/v1/tasks");
const allTask = tasks.map((task) => console.log(task));
// console.log(tasks[0].name);
    } catch (err) {
        console.error(err);
    }
};

showTasks();