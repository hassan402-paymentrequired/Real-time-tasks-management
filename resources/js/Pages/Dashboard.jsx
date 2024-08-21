import Doughnuts from "@/Components/Doughnut";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import{ Links } from "@/Components/Link";

export default function Dashboard({ auth, tasks }) {
    const [task, setTask] = useState(null)


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="flex max-w-6xl w-full mx-auto p-3 space-x-6 flex-col">
                {/* cards */}

                <div className="flex w-full p-2 mx-auto  max-w-4xl items-center h-28 space-x-4 bg-gray-700 rounded-md">
                    <Doughnuts />
                    <div className="flex flex-col flex-1">
                        <h2 className="text-3xl font-semibold text-white">
                            Welcome Hassan
                        </h2>
                        <p className="text-white mt-2">
                            Access and manage your Tasks effiectiently
                        </p>
                    </div>

<div className="flex flex-1 justify-end  w-full">

                    <Links path={"/tasks/create"}>Create task</Links>
</div>
                </div>

                {/* table */}

                <div className="flex flex-col w-full mx-auto mt-5">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="md:min-w-full sm:mx-auto min-w-52 text-left text-sm font-light">
                                    <thead className="border-b bg-gray-800">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-white"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-white"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-white"
                                            >
                                                Content
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-white"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-white"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.tasks.map((task) => (
                                            <tr
                                                className="border-b border-gray-600 bg-gray-700"
                                                key={task.id}
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                                                    {task.id }
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-white">
                                                    {task.title}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-white">
                                                    {task.contents}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-white">
                                                    <div
                                                        x-data="{ currentVal: 20 ,minVal: 0 ,maxVal: 100, calcPercentage(min, max, val){return ((val-min)/(max-min))*100} }"
                                                        className="flex h-2.5 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
                                                        role="progressbar"
                                                    >
                                                        <div
                                                            className="h-full rounded-xl bg-green-500 w-1/2"
                                                            style={{
                                                                width: `${task.status}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 space-x-3">
                                                <Links path={`/task/${task.id}`}>more</Links>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
