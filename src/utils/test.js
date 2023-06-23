import {useRouter} from "next/router";
import {Fragment, useRef, useState} from "react";
import {useGlobalContext} from "@/context/globalContext";
import {Dialog, Transition} from "@headlessui/react";

export function Test({open = false, setOpen}) {
    const router = useRouter();
    const cancelButtonRef = useRef(null);
    const {makeState} = useGlobalContext();
    const [state, setState] = useState({
        firstName: "Manipuri",
        lastName: "",
        dob: new Date(),
        expectedLife: 80,
    });

    const handleChange = (field, value) => {
        const person = {...state};
        if (field === "fname") {
            person.firstName = value;
        } else if (field === "expectedLife") {
            person.expectedLife = +value;
        } else if (field === "dob") {
            person.dob = new Date(value);
        }
        setState(person);
        console.log(person);
    };

    const handleSave = () => {
        setOpen(false);
        localStorage.setItem("user", JSON.stringify(state));
        makeState(state);
        router.push("/calendar");
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl py-5">
                                <div className={"border-b px-5"}>
                                    <h2 className={"text-xl font-semibold"}>
                                        Enter Your Details
                                    </h2>
                                </div>

                                <div className="bg-white px-5 py-4">
                                    <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="firstName"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                First Name
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        id="firstName"
                                                        autoComplete="firstName"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                        placeholder={state.firstName}
                                                        onChange={(event) =>
                                                            handleChange("fname", event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="dob"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Date of Birth (MM/DD/YYYY)
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                                    <input
                                                        type="date"
                                                        name="dob"
                                                        id="dob"
                                                        autoComplete="lastName"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                        placeholder={state.dob}
                                                        onChange={(event) =>
                                                            handleChange("dob", event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="expectedLife"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Expected Life
                                            </label>
                                            <div className="mt-2">
                                                <div
                                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                                    <input
                                                        type="number"
                                                        name="expectedLife"
                                                        id="expectedLife"
                                                        autoComplete="lastName"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                        placeholder={state.expectedLife}
                                                        onChange={(event) =>
                                                            handleChange("expectedLife", event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <button
                                        type="button"
                                        className="w-1/4  block mx-auto justify-center rounded-full bg-blue-600 px-5 py-2 text-base text-white shadow-sm hover:bg-blue-700 "
                                        onClick={() => handleSave()}
                                    >
                                        Save
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}