const DiaryHeader = ({ name, description }) => {
  return (
    <div className="mb-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-gray-600 max-w-2xl">{description}</p>
    </div>
  );
};

export default DiaryHeader;
