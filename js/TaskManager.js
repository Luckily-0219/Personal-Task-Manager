class TaskManager{

    constructor(){

        this.tasks =
            StorageManager.load();

    }

    add(task){

        this.tasks.push(task);

        StorageManager.save(this.tasks);

    }

    delete(id){

        this.tasks =
            this.tasks.filter(
                task => task.id != id
            );

        StorageManager.save(this.tasks);

    }

    complete(id){

        const task =
            this.tasks.find(
                t => t.id == id
            );

        if(task){

            task.completed =
			!task.completed

        }

        StorageManager.save(this.tasks);

    }

    edit(id,newTitle,newDescription){

        const task =
            this.tasks.find(
                t => t.id == id
            );

        if(task){

            task.title =
                newTitle;

            task.description =
                newDescription;

        }

        StorageManager.save(this.tasks);

    }

}