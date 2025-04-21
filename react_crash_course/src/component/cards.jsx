function Card({ title, description, image }) {
  return (
    <div className="w-64 h-80 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden m-4 flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Card;
