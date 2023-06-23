import {useRouter} from "next/router";
import {Fragment, useEffect, useRef, useState} from "react";
import {useGlobalContext} from "@/context/globalContext";
import {Dialog, Transition} from "@headlessui/react";
import moment, {min} from "moment";

function UserDetailsForm() {
    const router = useRouter();
    const cancelButtonRef = useRef(null);
    const {makeState, user, setUserDetailsModal, userDetailsModal} = useGlobalContext();
    const [error, setError] = useState({firstName: '', lastName: '', expectedLife: '', dob: ''});
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        dob: new Date('01/01/1999'),
        expectedLife: 80,
    });

    useEffect(() => {
        if (user != null) {
            const newState = {
                firstName: user.firstName,
                lastName: "",
                dob: user.dob,
                expectedLife: user.expectedLife,
            }
            setState(newState);
        }
    }, [user, userDetailsModal]);

    const handleChange = (field, value) => {
        const newState = {...state};
        if (field === 'dob') {
            newState[field] = new Date(value);
        } else if(field === 'expectedLife') {
            newState[field] = parseInt(value);
        } else {
            newState[field] = value;
        }
        setState(newState);
        // validate();
    };

    function isDataValid() {
        const err = {firstName: '', dob: '', expectedLife: ''};

        if (state.firstName == '')
            err.firstName = 'This field is required';

        if (state.dob == null || state.dob == '') {
            err.dob = 'This field is required';
        } else if (state.dob > new Date()) {
            err.dob = 'Date of birth cannot be greater than today';
        }

        if (state.expectedLife == null || state.expectedLife == '') {
            err.dob = 'This field is required';
        }

        if (err.dob == '' && err.expectedLife == '') {
            let minAge = moment(new Date()).subtract(new Date(state.dob).getFullYear(), 'y').toDate().getFullYear();
            minAge = Math.max(50, minAge);

            if (state.expectedLife < minAge)
                err.expectedLife = `Should be above ${minAge} years`;

        }
        setError(err);

        const status = Object.values(err).every((x) => x == "");
        if (status) {
            console.log("Valid Data");
        }
        return status;

    }

    const handleSave = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (!isDataValid()) return;
        setUserDetailsModal(false);
        localStorage.setItem("user", JSON.stringify(state));
        console.log(state);
        makeState(state);
        router.push("/calendar");
    };

    const handleClear = () => {
        localStorage.removeItem('user');
        window.location.replace('/');
    }
    return (
        <Transition.Root show={userDetailsModal} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setUserDetailsModal}
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

                <div className="fixed inset-0 z-10 overflow-y-auto items-center justify-center">
                    <div
                        className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
                                className="relative transform overflow-hidden rounded-lg bg-gray-800 text-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl py-5">
                                <div className={"border-b border-gray-700 px-5"}>
                                    <h2 className={"text-xl font-semibold pb-5"}>
                                        Enter Your Details
                                    </h2>
                                    <p></p>
                                </div>
                                <form onSubmit={handleSave}>

                                    <div className="bg-gray-800 px-5 py-4">
                                        <div className=" ">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="firstName"
                                                    className="block text-sm font-medium leading-6 text-gray-300"
                                                >
                                                    User Name
                                                </label>
                                                <div className="mt-0.5">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            id="firstName"
                                                            autoComplete="firstName"
                                                            className="block flex-1 border rounded-md bg-transparent py-1.5 pl-1 text-gray-300 placeholder:text-gray-500 sm:text-sm sm:leading-6 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder={'Brownie Green'}
                                                            value={state.firstName}
                                                            onChange={(event) =>
                                                                handleChange("firstName", event.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    {error.firstName != '' &&
                                                        <p className="text-red-500 text-sm pt-1">{error.firstName}</p>}
                                                </div>
                                            </div>


                                            <div className=" mb-2">
                                                <label
                                                    htmlFor="dob"
                                                    className="block text-sm font-medium leading-6 text-gray-300"
                                                >
                                                    Date of Birth
                                                </label>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                                        <input
                                                            type="date"
                                                            name="dob"
                                                            id="dob"
                                                            autoComplete="dob"
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                            placeholder={""}
                                                            value={moment(state?.dob)?.format('YYYY-MM-DD')}
                                                            onChange={(event) =>
                                                                handleChange("dob", event.target.value)
                                                            }
                                                            max={moment(new Date())?.format('YYYY-MM-DD')}
                                                        />
                                                    </div>
                                                    {error.dob != '' &&
                                                        <p className="text-red-500 text-sm pt-1">{error.dob}</p>}
                                                </div>
                                            </div>
                                            
                                            <div className="mb-2 ">
                                                <label
                                                    htmlFor="expectedLife"
                                                    className="block text-sm font-medium leading-6 text-gray-300"
                                                >
                                                    Expected Life
                                                </label>
                                                <div className="mt-0.5">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                                        <input
                                                            type="number"
                                                            name="expectedLife"
                                                            id="expectedLife"
                                                            autoComplete="lastName"
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                            placeholder={"80"}
                                                            value={state.expectedLife}
                                                            onChange={(event) =>
                                                                handleChange("expectedLife", event.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    {error.expectedLife != '' &&
                                                        <p className="text-red-500 text-sm pt-1">{error.expectedLife}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-700 pt-3 flex flex-row-reverse text-white">

                                        <button
                                            type="submit"
                                            className={`block rounded-lg bg-blue-600 px-8 py-2 text-sm shadow-sm hover:bg-blue-700 mx-4`}
                                            onClick={() => handleSave()}
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            className=" block rounded-lg bg-red-600 px-8 py-2 text-sm  shadow-sm hover:bg-red-700"
                                            onClick={() => handleClear()}
                                        >
                                            Clear
                                        </button>

                                    </div>

                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default UserDetailsForm;