<script>
  import { db } from "./firebase.js";
  import toastr from "toastr";

  let task = {
    name: "",
    description: "",
  };

  let tasks = [];
  let editStatus = false;
  let currentId;

  db.collection("tasks").onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    tasks = [...docs];
  });

  const addTask = async () => {
    await db
      .collection("tasks")
      .doc()
      .set({
        ...task,
        createdAt: Date.now(),
      });
    console.log("Nueva tarea Creada");
  };

  const updateTask = async () => {
    await db.collection("tasks").doc(currentId).update(task);
    toastr.success("Tarea Actualizada satisfactoriamente", {
      timeOut: 1000,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });
  };

  const handleSubmit = () => {
    if (!editStatus) {
      addTask();
    } else {
      updateTask();
    }

    task = { name: "", description: "" };
  };

  const deleteTask = async (id) => {
    await db.collection("tasks").doc(id).delete();
  };

  const editTask = (currentTask) => {
    editStatus = true;
    task.name = currentTask.name;
    task.description = currentTask.description;
    currentId = currentTask.id;
  };

  const onCancel = () => {
    editStatus = false;
    task = { name: "", description: "" };
  };
</script>
<div class="container p-4">
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <form on:submit|preventDefault="{handleSubmit}" class="card card-body">
        <div class="form-group">
          <input
            type="text"
            placeholder="Escribe una tarea"
            bind:value="{task.name}"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <textarea
            rows="3"
            placeholder="Escribe una descripcion de la tarea"
            bind:value="{task.description}"
            class="form-control"
          ></textarea>
        </div>

        <button class="btn btn-primary">
          {#if editStatus}Update{:else}Guardar{/if}
        </button>
        {#if editStatus}
        <button on:click="{onCancel}" class="btn btn-info">Cancel</button>
        {/if}
      </form>

      {#each tasks as task}
      <div class="card card-body mt-2">
        <div class="d-flex justify-content-between">
          <h5>{task.name}</h5>
          <i
            class="material-icons"
            on:click="{editTask(task)}"
            style="vertical-align: middle;"
            >edit</i
          >
        </div>
        <p>{task.description}</p>

        <button on:click="{deleteTask(task.id)}" class="btn btn-danger">
          <i class="material-icons" style="vertical-align: middle;"
            >delete_forever</i
          >
        </button>
      </div>
      {/each}
    </div>
  </div>
</div>

<style></style>
