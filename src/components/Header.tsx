
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/5b9ef36e-bd2a-4ad5-ace9-03fbf1470d15.png"
            alt="Nobias Logo"
            className="h-16 cursor-pointer"
            onClick={() => navigate("/nobias")}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
