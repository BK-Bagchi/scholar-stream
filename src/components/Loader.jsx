import { GridLoader } from "react-spinners";

const Loader = ({ loading = true }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <GridLoader color="#2563EB" loading={loading} size={15} margin={5} />
    </div>
  );
};

export default Loader;
