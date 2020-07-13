import * as React from "react";
import { database } from "../helpers/database";
// Initialize Firebase

const SuccessMessageForContactForm = () => (
    <div className="flex flex-col">
        <span className="text-4xl flex justify-center text-center">
            Thank You!
        </span>
        <span className="text-3xl flex justify-center text-center">
            Your message is on its way to me
        </span>
        <img
            className="mt-10 object-scale-down"
            src="/success-hedgehog.png"
            alt="Success hedgehog meme"
        />
    </div>
);

export default () => {
    const [form, setForm] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    // There is no validation in the interest of time //TODO
    function handleUpdate(event: any) {
        const target = event.target;
        setForm({ ...form, [target.name]: target.value });
    }

    // Creates a new field in firebase real time database under current Date
    function handleSend() {
        setButtonDisabled(true);
        database.ref("ContactForm/" + Date.now()).set(form);
        setFormSubmitted(true);
    }

    return (
        <section className=" body-font flex flex-col h-full ">
            <div className=" px-5 py-24 ">
                {formSubmitted ? (
                    <SuccessMessageForContactForm />
                ) : (
                    <>
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                                Contact Me!
                            </h1>

                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                                I will get back to you as soon as possible.{" "}
                                <br />
                                You can also reach me at{" "}
                                <a
                                    className="underline"
                                    href="mailto:alex@bestest.tech"
                                >
                                    alex@bestest.tech
                                </a>
                            </p>
                        </div>

                        <div className="lg:w-1/2 md:w-2/3 mx-auto">
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-1/2">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleUpdate}
                                        className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                                        type="text"
                                    />
                                </div>
                                <div className="p-2 w-1/2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleUpdate}
                                        className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                                        type="email"
                                    />
                                </div>
                                <div className="p-2 w-full">
                                    <label htmlFor="email">Message</label>

                                    <textarea
                                        value={form.message}
                                        name="message"
                                        onChange={handleUpdate}
                                        className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block"
                                    ></textarea>
                                </div>
                                <div className="p-2 w-full">
                                    <button
                                        onClick={handleSend}
                                        disabled={buttonDisabled}
                                        className={`${
                                            buttonDisabled &&
                                            "opacity-50 cursor-not-allowed"
                                        } flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg`}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};
