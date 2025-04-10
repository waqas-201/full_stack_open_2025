import { useDispatch } from "react-redux";
import { filterAnecdote } from "../slices/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const data = e.target.value;

    dispatch(filterAnecdote({ term: data }));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="term" onChange={handleChange} />
    </div>
  );
};

export default Filter;
