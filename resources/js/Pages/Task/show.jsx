import Dialogs from '@/Components/Dialogs'
import { Links } from '@/Components/Link';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react'

const show = ({task, auth}) => {
    const { data, setData, delete: destroy, processing, errors } = useForm();

    const handleDelete = (e) => {
      e.preventDefault();

      router.delete(`/task/delete/${task.id}`);


    }
  
    const [open, setOpen] = useState(true);
  return (
    <AuthenticatedLayout user={auth.user}>
    <div className="flex flex-col">

      <div className="flex flex-col max-w-2xl p-3 text-center space-y-5 items-center justify-center w-full h-screen">

        <div className="chart"></div>

        <h2 className="text-2xl text-white font-semibold">{task.title}</h2>
        <h2 className="text-2xl text-white font-semibold">{task.contents}</h2>

      <div className="flex items-center justify-between w-full">
        <Links path={`/task/edit/${task.id}`}>Edit</Links>
        <PrimaryButton onClick={handleDelete}>Delete</PrimaryButton>
      </div>

      </div>

      <Dialogs open={open} setOpen={setOpen} task={task} user={auth.user} />
    </div>
    </AuthenticatedLayout>
)
}

export default show