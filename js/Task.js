class Task{

    constructor(
        title,
        description,
        priority,
        deadline
    ){

        this.id = Date.now();

        this.title = title;
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;

        this.completed = false;
    }

    complete(){

        this.completed = true;

    }

}