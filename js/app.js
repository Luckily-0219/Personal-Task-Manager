const manager =
    new TaskManager();
    renderTasks();

function addTask(){

    const title =
        document.getElementById(
            "title"
        ).value;

    const description =
        document.getElementById(
            "description"
        ).value;

    const priority =
        document.getElementById(
            "priority"
        ).value;

    const deadline =
        document.getElementById(
            "deadline"
        ).value;

    if(
        !Validator.validate(title)
    ){

        alert(
            "Title is required."
        );

        return;
    }

    const task =
        new Task(
            title,
            description,
            priority,
            deadline
        );

    manager.add(task);

    renderTasks();

}

function renderTasks(tasks = manager.tasks) {

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(task => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(task.deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        const overdue = !task.completed && deadlineDate < today;

        const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

        let color = "";

        if(task.priority==="High")
            color="red";

        if(task.priority==="Medium")
            color="orange";

        if(task.priority==="Low")
            color="green";

        list.innerHTML += `
        <li class="${task.completed ? 'completed' : ''}">

            <h3 style="color:${color}">
                ${task.title}
            </h3>

            <p>
                ${task.description}
            </p>

            <p>
                Deadline:
                ${task.deadline}
            </p>

	        <p>
   		         Priority: <strong>${task.priority}</strong>
            </p>

            <p>
                Status:
                ${
            overdue
                ? "Overdue!"
            : (
                task.completed
                    ? "Completed"
                    : "Pending"
                )
                }
            </p>

            </p>
            ${
                diffDays > 0
                ? `${diffDays} days left`
                : "Deadline Passed"
            }
            </p>

             <button
 	      onclick="completeTask(${task.id})">

              ${
              task.completed
              ? "Pending"
    	      : "Complete"
              }

            </button>

            <button
             onclick="editTask(${task.id})">
             Edit
            </button>

            <button
             onclick="deleteTask(${task.id})">
             Delete
            </button>

        </li>
        `;

    });

    updateStats();

}

function deleteTask(id){

    manager.delete(id);

    renderTasks();

}

function searchTask(){

    const keyword =
        document.getElementById(
            "search"
        ).value.toLowerCase();

    const results =
        manager.tasks.filter(task =>

            task.title
                .toLowerCase()
                .includes(keyword)

            ||

            task.description
                .toLowerCase()
                .includes(keyword)

        );

    renderTasks(results);

}
function completeTask(id){

    manager.complete(id);

    renderTasks();

}

function editTask(id){

    const title =
        prompt(
            "New Title"
        );

    const description =
        prompt(
            "New Description"
        );

    manager.edit(
        id,
        title,
        description
    );

    renderTasks();

}

function filterByPriority(){

    const value =
        document.getElementById("priorityFilter").value;

    if(value === "all"){
        renderTasks();
        return;
    }

    const results =
        manager.tasks.filter(task =>
            task.priority === value
        );

    renderTasks(results);
}
function updateStats(){

    document.getElementById(
        "totalTasks"
    ).textContent =
        manager.tasks.length;

    document.getElementById(
        "completedTasks"
    ).textContent =
        manager.tasks.filter(
            task =>
            task.completed
        ).length;

}
