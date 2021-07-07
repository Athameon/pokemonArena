import Loader from "react-loader-spinner";

const UserSelectComponent = ({ name, trainers, setTrainer, isLoading }) => {
  if (isLoading) {
    return (
      <div>
        <Loader type="ThreeDots" color="#00BFFF" width={100} />
      </div>
    );
  } else {
    return (
      <>
        <select onChange={setTrainer} name={name} id={name}>
          <option value="-">-</option>
          {trainers &&
            trainers.map((trainer) => {
              return (
                <option key={{ name } + "_" + trainer._id} value={trainer._id}>
                  {trainer.name}
                </option>
              );
            })}
        </select>
      </>
    );
  }
};

export default UserSelectComponent;
