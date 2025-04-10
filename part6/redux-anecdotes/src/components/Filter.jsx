import { useDispatch } from "react-redux";
import { filterAncedote } from "../reducers/actionCreators";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const data = e.target.value;

    dispatch(filterAncedote(data));
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
