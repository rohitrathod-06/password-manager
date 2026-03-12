import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export default function App() {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [editId, setEditId] = useState();
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem("passwords");
    return savedRows ? JSON.parse(savedRows) : [];
  });

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }
  function addrow() {
    if (!form.site || !form.username || !form.password) return;
    if (editId) {
      setRows(rows.map((r) => (r.id === editId ? { ...form, id: editId } : r)));
      setEditId(null);
    } else {
      const id = uuidv4();
      setRows([...rows, { ...form, id }]);
    }
    setForm({ site: "", username: "", password: "" });
  }

  const editPassword = (id) => {
    const row = rows.find((r) => r.id === id);
    setForm({ site: row.site, username: row.username, password: row.password });
    setEditId(id);
  };
  const deletePassword = (id) => {
    const row = rows.filter((r) => r.id !== id);
    setRows(row);
  };
  useEffect(() => {
    const savedRows = localStorage.getItem("passwords");
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(rows));
  }, [rows]);

  const copyText = (label, text) => {
    toast.success(`${label.charAt(0) + label.slice(1)} copied!`, {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100">
        <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-2xl text-green-400">
            &lt;<span className="text-white">Pass</span>
            <span>OP</span>/&gt;
          </div>
          <a
            href="https://github.com"
            className="rounded px-3 py-1 bg-green-500 hover:bg-green-600 transition flex items-center gap-2"
          >
            <FaGithub /> GitHub
          </a>
        </nav>
        <section className="max-w-3xl mx-auto text-center px-4 py-8">
          <h1 className="text-3xl font-extrabold text-slate-800">
            &lt;Pass<span className="text-green-600">OP</span>/&gt;
          </h1>
          <p className="text-slate-500 mt-1">Your own Password Manager</p>
          <div className="mt-6 max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Enter Website URL "
              value={form.site}
              onChange={update("site")}
              className="w-full rounded-full border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 pr-10"
            />
            <input
              type="text"
              placeholder="Enter Username "
              value={form.username}
              onChange={update("username")}
              className="w-full rounded-full border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 pr-10"
            />
            <div className="relative ">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter Password "
                value={form.password}
                onChange={update("password")}
                className="w-full rounded-full border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 pr-10"
                aria-label="Toggle password"
              />
              <button
                type="button"
                onClick={() => setShowPass((e) => !e)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                aria-label="Toggle password"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              onClick={addrow}
              className="mt-6 mx-auto font-bold text-lg block rounded-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 transition"
            >
              {editId ? "save Password" : "Add Password"}
            </button>
            <section className="max-w-4xl  flex flex-col  items-center px-4 mt-10">
              <h2 className="text-left font-bold text-2xl mb-3">
                Your Passwords
              </h2>
              <table className="  w-full border-collapse overflow-hidden rounded">
                <thead>
                  <tr className="bg-green-700 text-white">
                    <th className="text-left py-2 px-4"> Site</th>
                    <th className="text-left py-2 px-4"> Username</th>
                    <th className="text-left py-2 px-4"> Password</th>
                    <th className="text-left py-2 px-4"> Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="bg-green-100 text-lg  ">
                      <td className=" text-left py-2 text-blue-500 font-semibold px-4 hover:underline hover:text-blue-800   ">
                        <a href={r.site}>{r.site}</a>
                      </td>
                      <td className="text-left py-2 px-4 ">
                        <div
                          className="  flex gap-2"
                          onClick={() => {
                            copyText("username", r.username);
                          }}
                        >
                          {r.username}
                          <span className="cursor-pointer">
                            <span class="material-symbols-outlined">
                              copy_all
                            </span>
                          </span>
                        </div>
                      </td>

                      <td className="text-left py-2 px-4  ">
                        <div
                          className="   flex gap-2 "
                          onClick={() => {
                            copyText("password", r.password);
                          }}
                        >
                          {r.password}
                          <span className="cursor-pointer">
                            <span class="material-symbols-outlined">
                              copy_all
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="text-left py-2 px-4 ">
                        <div className="  flex gap-2 ">
                          {r.action}
                          <button
                            className="cursor-pointer "
                            onClick={() => {
                              editPassword(r.id);
                            }}
                          >
                            <span class="material-symbols-outlined">edit</span>
                          </button>
                          <button
                            className="cursor-pointer "
                            onClick={() => {
                              deletePassword(r.id);
                            }}
                          >
                            <span class="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </section>
        <footer className=" md:w-full text-center bg-slate-900 text-white  py-4">
          Your passwords, locked and protected 🔐.
        </footer>
      </div>
    </>
  );
}
