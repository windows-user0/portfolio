import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyCH7DK-nNzhNxLra0tSQIqYoDe4Le-GhlM",
  authDomain: "portfolio-5671f.firebaseapp.com",
  databaseURL: "https://portfolio-5671f.firebaseio.com",
  projectId: "portfolio-5671f",
  storageBucket: "portfolio-5671f.appspot.com",
  messagingSenderId: "636842043310",
  appId: "1:636842043310:web:817f02b8b7a84efc62ca3f",
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase

export default () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  function handleUpdate(event: any) {
    const target = event.target;

    setForm({ ...form, [target.name]: target.value });
  }
  function handleSend() {
    setButtonDisabled(true);
    firebase
      .database()
      .ref("ContactForm/" + Date.now())
      .set(form);
    setFormSubmitted(true);
  }

  return (
    <section className=" body-font flex flex-col h-full ">
      <div className=" px-5 py-24 ">
        {formSubmitted ? (
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
        ) : (
          <>
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                Contact Me
              </h1>

              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                I will get back to you as soon as possible.
              </p>
            </div>

            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleUpdate}
                    className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                    placeholder="Name"
                    type="text"
                  />
                </div>
                <div className="p-2 w-1/2">
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleUpdate}
                    className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                    placeholder="Email"
                    type="email"
                  />
                </div>
                <div className="p-2 w-full">
                  <textarea
                    value={form.message}
                    name="message"
                    onChange={handleUpdate}
                    className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="p-2 w-full">
                  <button
                    onClick={handleSend}
                    disabled={buttonDisabled}
                    className={`${
                      buttonDisabled && "opacity-50 cursor-not-allowed"
                    } flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg`}
                  >
                    Button
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
