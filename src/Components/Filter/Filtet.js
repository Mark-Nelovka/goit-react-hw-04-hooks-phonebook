import PropTypes from "prop-types";
export default function Filter({ value, onChange }) {
  return (
    <label>
      <input onChange={onChange} type="text" name="filter" value={value} />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
