import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link, router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
const Dialogs = ({ open, setOpen, task, user }) => {

    const {data , setData , patch , errors} = useForm();


    const handlePending = (id) => {
        router.patch(`/task/status/${id}`)
    }
    
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full flex-col items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform flex flex-col overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white relative px-4 pb-4 pt-5 sm:p-7 sm:pb-4">
                         <Link href="/dashboard" > <ExclamationTriangleIcon className="w-6 top-3 right-3 p-1 bg-gray-400 rounded-full text-white font-bold absolute"/></Link>
                            <div className="sm:flex sm:flex-col sm:items-start">
                                <div
                                    x-data="{ currentVal: 20 ,minVal: 0 ,maxVal: 100, calcPercentage(min, max, val){return ((val-min)/(max-min))*100} }"
                                    className="flex mt-3 h-2.5 w-full overflow-hidden rounded-xl bg-green-200"
                                    role="progressbar"
                                >
                                    <div
                                        className="h-full rounded-xl bg-green-500"
                                        style={{
                                            width: `${task.status}%`,
                                        }}
                                    ></div>
                                </div>
                                <div className="mt-3 text-center w-full pt-5  sm:ml-4 sm:mt-0 ">
                                    <DialogTitle
                                        as="h3"
                                        className="text-2xl uppercase font-semibold leading-6 text-gray-900"
                                    >
                                        {task.title}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-base text-gray-500">
                                            {task.contents}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                {...(task.status === 50 ? 'disabled' : "")}
                                onClick={() => handlePending(task.id)}
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Pending
                            </button>
                            <button
                                {...(task.status === 100 ? 'disabled' : "")}
                                type="button"
                                data-autofocus
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Completed
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

// onClick={() => setOpen(false)}

export default Dialogs;
