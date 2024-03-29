import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/api";
import Service from "./service/service";

interface Entry {
  name: string;
  link: string;
}

const mock: Entry[] = [
  {
    name: "Трубы",
    link: "lorem",
  },
  {
    name: "Краны",
    link: "lorem",
  },
  {
    name: "Вентиляция",
    link: "lorem",
  },
  {
    name: "Системы отопления",
    link: "lorem",
  },
];

function App() {
  const [opts, setOpts] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const opts = await Service.products();
      setOpts(opts);
    };

    fetchData();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    const res = await Service.query(selected);
    setEntries(res);
    setLoading(false);
  };

  return (
    <div>
      <div className="mt-16">
        <span className="text-2xl">Выберите пункт: </span>
        <select className="p-2" value={selected} onChange={handleChange}>
          <option value="0">Выберите пункт</option>
          {opts.map((o: string) => (
            <option value={o}>{o}</option>
          ))}
        </select>
        <button
          className="ml-4 bg-blue-500 text-white rounded-sm p-2"
          onClick={handleClick}
        >
          Показать
        </button>
      </div>
      <div className="mt-16 w-full">
        <table className="border table rounded-sm w-full">
          <thead>
            <th className="border-2 p-2">Название</th>
            <th className="border-2 p-2">Ссылка</th>
          </thead>
          <tbody>
            {entries && entries.length == 0 ? (
              loading ? (
                <h1>Загрузка...</h1>
              ) : (
                <h1>Выберите категорию</h1>
              )
            ) : (
              entries.map((item: Entry) => (
                <tr className="" key={item.name}>
                  <td className="px-2 py-2 border text-left">{item.name}</td>
                  <td className="px-2 py-2 border text-left text-blue-400 hover:underline">
                    <a href={item.link}>{item.link}</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
