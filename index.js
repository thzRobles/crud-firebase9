import {
    saveTask, 
    getTasks, 
    onGetTasks, 
    deleteTasks, 
    getTask,
    updateTask
} from './firebase.js';

const tasksContainer = document.getElementById('task-container');

let editStatus = false;
let id = '';

//Escuchando cambios
window.addEventListener('DOMContentLoaded', async () => {
    
    // Cuando ocurra un cambio en la base de datos de tareas voy a recibir los datos nuevos y cuando reciba los datos nuevos voy a crear una constante html, voy a recorrer esos datos, voy a rellenar el html y luego colocar esos datos dentro del taskContainer, en tiempo real.
    onGetTasks((querySnapshot) => {

        tasksContainer.innerHTML = '';

        //Obtiene los objetos/documentos que hay en la base de datos de firebase.
        //Aqui se creo directamente el html por simplicidad, pero lo ideal es crearlo en el documendo index.html y llamarlo mediante document.getElement y luego modificarlo.
        querySnapshot.forEach(doc => {
            const task = doc.data();
            //Muestra lo que hay en el html, osea los datos que se agregan a la base de datos.
            tasksContainer.innerHTML += `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5">${task.title}</h3>
                    <p>${task.description}</p>
                    <div>
                        <button class='btn btn-primary btn-delete' data-id="${doc.id}">Delete</button>
                        <button class='btn btn-secondary btn-edit' data-id="${doc.id}">Edit</button>
                    </div>
                </div>
            `;
        });

        //Selecciona todos los botones con la clase btn-delete para borrarlos.
        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
        //Por cada boton, busca el objeto donde esta el id. Con codigo moderno.
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset }}) => {
                deleteTasks(dataset.id);
            });
        });

        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit');
        btnsEdit.forEach((btn) => {
            //Por cada boton, busca el objeto donde esta el id. Con codigo antiguo.
            btn.addEventListener('click', async (e) => {
                const doc = await getTask(e.target.dataset.id);
                const task = doc.data();

                taskForm['task-title'].value = task.title;
                taskForm['task-description'].value = task.description;

                editStatus = true;
                id = doc.id;

                taskForm['btn-task-save'].innerText = 'Update';
            });
        });

    });

});

//Esta variable se puede agrupar junto a las demas.
const taskForm = document.getElementById('task-form'); 

//Añade una nueva tarea sin actualizar la pagina por defecto y cuando le das save resetea los campos.
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskForm['task-title'];
    const description = taskForm['task-description'];

    //Condicion para guardar o actualizar.
    if (!editStatus) {
        saveTask(title.value, description.value);

    } else {
        updateTask(id, {
            title: title.value, 
            description: description.value
        });

        editStatus = false;
        taskForm['btn-task-save'].innerText = 'Save';
    }

    taskForm.reset();

});
