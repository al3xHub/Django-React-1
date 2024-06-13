import { useForm } from 'react-hook-form';
import { createTask, deleteTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';

export function TasksFormPage() {

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const navigate = useNavigate();
    const param = useParams();

    const onSubmit = handleSubmit(async data => {
        await createTask(data);
        navigate("/tasks")

    })

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    {...register("title", { required: true })}
                />

                {errors.title && <span>This field is required</span>}

                <textarea
                    name=""
                    id=""
                    rows="3"
                    placeholder="description"
                    {...register("description", { required: true })}
                ></textarea>

                {errors.description && <span>This field is required</span>}

                <button>Save</button>
            </form>
            {param.id && <button onClick={async () =>{
                const accepted = window.confirm("Are you sure you want to delete this task?")
                if(accepted){
                    await deleteTask(param.id);
                    navigate("/tasks");
                }
            }}>Delete</button>}
        </div>
    )
}