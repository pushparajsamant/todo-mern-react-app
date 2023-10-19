interface NoteItemPropsType {
  title: string;
  description?: string;
  id: string;
  onEdit(): void;
  onDelete(): void;
}

const NoteItem: React.FC<NoteItemPropsType> = ({ title, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded p-5">
      <p className="text-l font-semibold mb-2">{title}</p>
      <div className="space-x-4">
        <button className="bg-blue-500 text-white p-2 rounded">View</button>
        <button className="bg-gray-700 text-white p-2 rounded" onClick={onEdit}>
          Edit
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
