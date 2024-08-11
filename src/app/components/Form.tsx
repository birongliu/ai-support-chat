import React, { useState } from "react";
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};
const defaultFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
};
export default function Form({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [] = useState();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Thanks for signing up for waitlist...");
    setTimeout(() => {
      setMessage("");
      handleOpen();
      setFormData(defaultFormData);
    }, 1000);
  };
  return (
    <main
      className={`absolute z-10 bg-gray-900 rounded md:mx-24 my-32 mx-10 inset-0 text-black ${
        !open ? "hidden" : ""
      } `}
    >
      <button
        onClick={handleOpen}
        disabled={message ? true : false}
        className="relative float-right m-3 rounded-full px-5 border-2 border-gray-500 text-gray-500 hover:bg-gray-400"
      >
        x
      </button>
      <form
        onSubmit={handleFormSubmit}
        id="waitlist-form"
        className="flex mx-20 right-10 left-10 flex-col justify-center items-center h-full gap-4"
      >
        <h1 className="text-2xl text-gray-400">Waitlist Form</h1>
        <input
          className="p-2 rounded w-96 bg-gray-600"
          type="text"
          required
          form="waitlist-form"
          placeholder="first name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        ></input>
        <input
          className="p-2 rounded bg-gray-600  w-96"
          type="text"
          form="waitlist-form"
          required
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          placeholder="last name"
        ></input>
        <input
          className="p-2 rounded bg-gray-600 w-96"
          type="email"
          form="waitlist-form"
          value={formData.email}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email"
        ></input>
        {message && <h1 className="text-gray-400">{message}</h1>}
        <button
          className="p-2 rounded w-96 border font-bold text-gray-500 disabled:bg-gray-900"
          disabled={message ? true : false}
          form="waitlist-form"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
