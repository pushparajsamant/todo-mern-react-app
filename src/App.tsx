import { ChangeEventHandler, useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";
import "./index.css";
import axios from "axios";
interface NoteType {
  _id: string;
  title: string;
  description: string;
}
function App() {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  useEffect(() => {
    axios.get<NoteType[]>("http://localhost:8000/note").then((response) => {
      setNotes(response.data);
    });
  }, []);
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (selectedNoteId) {
            console.log(selectedNoteId);
            const { data } = await axios.patch(
              `http://localhost:8000/note/${selectedNoteId}`,
              {
                title: values.title,
                description: values.description,
              }
            );
            const filteredNotes = notes.filter(
              (note) => note._id != selectedNoteId
            );
            setNotes([data, ...filteredNotes]);
            setValues({ title: "", description: "" });
            setSelectedNoteId("");
            return;
          } else {
            const { data } = await axios.post("http://localhost:8000/note", {
              title: values.title,
              description: values.description,
            });
            //console.log(data);
            setNotes([data, ...notes]);
          }
        }}
        className="bg-white shadow-md rounded p-5 space-y-4"
      >
        <h1 className="font-semibold text-2xl text-center">Note Application</h1>
        <div>
          <input
            type="text"
            className="w-full border-b-2 border-gray-700 outline-none"
            placeholder="Title"
            onChange={handleChange}
            value={values.title}
            name="title"
          />
        </div>
        <div>
          <textarea
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36 "
            placeholder="Description"
            onChange={handleChange}
            name="description"
            value={values.description}
          ></textarea>
        </div>
        <div className="text-center">
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
      {notes.map((note, index) => (
        <NoteItem
          key={index}
          title={note.title}
          id={note._id}
          description={note.description}
          onEdit={() => {
            setValues({ title: note.title, description: note.description });
            console.log(note._id);
            setSelectedNoteId(note._id);
          }}
          onDelete={async () => {
            const result = confirm("Are you sure you want to delete?");
            if (result) {
              await axios.delete(`http://localhost:8000/note/${note._id}`);
              const updatedNotes = notes.filter(
                (noteItem) => noteItem._id !== note._id
              );
              setNotes(updatedNotes);
            }
          }}
        />
      ))}
    </div>
  );
}

export default App;
