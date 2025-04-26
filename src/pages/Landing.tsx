import { useEffect, useState } from "react";

interface todoProps {
  id: number;
  value: string;
  completed: boolean;
}

const Landing = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<todoProps[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const handleAddToDo = () => {
    if (todo.trim() === "") return;
    const newTodo: todoProps = {
      id: Date.now(),
      value: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const handleEditTodo = (itemId: number) => {
    if (editText.trim() === "") return;
    setTodos(
      todos.map((item) =>
        item.id === itemId ? { ...item, value: editText } : item,
      ),
    );
    setEditingId(null);
    setEditText("");
  };

  const startEditing = (itemId: number, currentText: string) => {
    setEditingId(itemId);
    setEditText(currentText);
  };

  const handleCompleted = (itemId: number) => {
    setTodos(
      todos.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDeleteTodo = (itemId: number) => {
    setTodos(todos.filter((item) => item.id !== itemId));
  };

  const filteredTodos = todos.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  return (
    <div className="p-16">
      <h1 className="text-2xl font-bold">To Do List</h1>

      {/* Add Section */}
      <div className="mt-4 flex w-1/4 flex-col gap-2">
        <label htmlFor="todo">Add a To Do</label>
        <input
          name="todo"
          type="text"
          className="rounded border px-2 py-1 focus:outline-red-400"
          placeholder="Feed the dog"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          onClick={handleAddToDo}
          className="cursor-pointer rounded border border-transparent bg-red-400 px-2 py-1 font-bold text-white transition-all duration-300 hover:border-red-400 hover:bg-transparent hover:text-red-400"
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          className={`rounded px-4 py-2 ${filter === "all" ? "bg-red-400 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`rounded px-4 py-2 ${filter === "active" ? "bg-red-400 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`rounded px-4 py-2 ${filter === "completed" ? "bg-red-400 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Todos List */}
      <div id="todosList">
        <h2 className="mt-12 text-lg font-bold">Todos List:</h2>
        <div className="mt-4 flex flex-col gap-2">
          {filteredTodos.map((item) => {
            const { id, value, completed } = item;
            return (
              <div className="flex items-center gap-2" key={id}>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => handleCompleted(id)}
                />

                {editingId === id ? (
                  <>
                    <input
                      type="text"
                      className="rounded border px-2 py-1 text-sm"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditTodo(id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleEditTodo(id)}
                      className="cursor-pointer rounded border border-transparent bg-green-500 px-2 py-1 text-white transition-all duration-300 hover:border-green-500 hover:bg-transparent hover:text-green-500"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p
                      className={`flex w-1/4 cursor-pointer items-center rounded ${completed ? "bg-green-400 line-through" : "bg-red-400"} px-2 py-1 text-sm text-white`}
                    >
                      {value}
                    </p>
                    <button
                      className="cursor-pointer rounded border border-transparent bg-blue-500 px-2 py-1 text-white transition-all duration-300 hover:border-blue-500 hover:bg-transparent hover:text-blue-500"
                      onClick={() => startEditing(id, value)}
                    >
                      Edit
                    </button>
                  </>
                )}

                <button
                  className="cursor-pointer rounded border border-transparent bg-red-500 px-2 py-1 text-white transition-all duration-300 hover:border-red-500 hover:bg-transparent hover:text-red-500"
                  onClick={() => handleDeleteTodo(id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Landing;
