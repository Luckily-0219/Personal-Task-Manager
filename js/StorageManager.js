class StorageManager{

    static save(tasks){

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }

    static load(){

        return JSON.parse(
            localStorage.getItem("tasks")
        ) || [];

    }

}