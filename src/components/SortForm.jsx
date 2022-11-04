import { Form } from "react-bootstrap";

export default function SortForm(props) {
  const { order_by, sort_by, sortAndOrderBy, setUrlParams } = props;

  const handleChange = (event) => {
    if (event.target.name === "sort_by") {
      sortAndOrderBy(event.target.value, "desc");
      setUrlParams(`sort_by=${event.target.value}`);
    } else {
      sortAndOrderBy(sort_by, event.target.value);
      setUrlParams(`sort_by=${sort_by}&order=${event.target.value}`);
    }
  };
  return (
    <Form className="sort-form">
      <label className="form-sort">Sort : </label>
      <select
        className=""
        name="sort_by"
        value={sort_by}
        onChange={handleChange}
      >
        <option value="created_at">Date Added</option>
        <option value="topic">Topic</option>
        <option value="votes">Votes</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
      </select>
      <select
        className="custom-select"
        value={order_by}
        name="order_by"
        onChange={handleChange}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </Form>
  );
}
