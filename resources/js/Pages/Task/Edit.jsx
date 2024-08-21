import InputLabel from '@/Components/InputLabel';
import { Head, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const Edit = ({task,auth}) => {
    const {data, setData, processing, errors, patch} = useForm({
        title: task.title,
        contents: task.contents,
        status: task.status
    });

    const submit = (e) => {
        e.preventDefault();
        router.patch(`/tasks/edit/${task.id}`, data);
    }

  return (
    <AuthenticatedLayout user={auth.user} >
            <Head title="Tasks - edit" />

            <h2 className="text-3xl text-white my-7 font-semibold text-center">
                Update Tasks
            </h2>

            <form onSubmit={submit} className="sm:mx-auto sm:max-w-xl md:max-w-xl p-3">
                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('title', e.target.value)}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="contents" value="Contents" />

                    <TextInput
                        id="contents"
                        type="text"
                        name="contents"
                        value={data.contents}
                        className="mt-1 block w-full"
                        autoComplete="current-contents"
                        onChange={(e) => setData('contents', e.target.value)}
                    />

                    <InputError message={errors.contents} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="status" value="Status" />

                    <TextInput
                        id="status"
                        type="number"
                        name="status"
                        value={data.status}
                        className="mt-1 block w-full"
                        autoComplete="current-status"
                        onChange={(e) => setData('status', e.target.value)}
                    />

                    <InputError message={errors.status} className="mt-2" />
                </div>

                

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        cancel
                    </PrimaryButton>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create
                    </PrimaryButton>
                </div>
            </form>

    </AuthenticatedLayout>
  )
}

export default Edit