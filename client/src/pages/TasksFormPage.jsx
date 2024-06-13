import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function TasksFormPage() {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const navigate = useNavigate();
    const param = useParams();

    const onSubmit = handleSubmit(async data => {
        if (param.id) {
            await updateTask(param.id, data);
            toast.success("Tarea actualizada!", {
                position: 'bottom-right', style: {
                    background: '#101010',
                    color: '#fff'
                }
            }
            )
        } else {
            await createTask(data);
            toast.success("Tarea creada!", {
                position: 'bottom-right', style: {
                    background: '#101010',
                    color: '#fff'
                }
            }
            )
        }

        navigate("/tasks")
    })

    useEffect(() => {
        async function loadTask() {
            if (param.id) {
                const res = await getTask(param.id);
                setValue('title', res.data.title)
                setValue('description', res.data.description)

            }else{
                reset({
                    title: '',
                    description: ''
                });
            }
        }
        loadTask();
    }, [param.id, setValue, reset]);

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    {...register("title", { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />

                {errors.title && <span>This field is required</span>}

                <textarea
                    name=""
                    id=""
                    rows="3"
                    placeholder="description"
                    {...register("description", { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                ></textarea>

                {errors.description && <span>This field is required</span>}

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
            </form>
            {param.id &&
                <div className='flex justify-end'>
                    <button
                        className='bg-red-500 p-3 rounded-lg w-48 mt-3'
                        onClick={async () => {
                            const accepted = window.confirm("Are you sure you want to delete this task?")
                            if (accepted) {
                                await deleteTask(param.id);

                                toast.success("Tarea eliminada!", {
                                    position: 'bottom-right', style: {
                                        background: '#101010',
                                        color: '#fff'
                                    }
                                }
                                )

                                navigate("/tasks");
                            }
                        }}>Delete</button>
                </div>
            }
        </div>
    )
}