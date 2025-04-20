function Card({ title, description, image }) {
  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden m-4">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      </div>
    </div>  
  );
}

export default Card;
