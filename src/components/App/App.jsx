import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegistrationModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import LogoutModal from "../LogoutModal/LogoutModal.jsx";
import { setToken, getToken, removeToken } from "../../utils/token.js";
import * as auth from "../../utils/auth";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import {
  addItem,
  getItems,
  deleteItem,
  editProfileInfo,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegistrationClick = () => {
    setActiveModal("registration");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogoutClick = () => {
    setActiveModal("logout");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleDeleteConfirmation = () => {
    setActiveModal("confirmation");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleAddItemSubmit = ({ name, imgUrl, weatherType }) => {
    const token = getToken();
    return addItem({ name, imageUrl: imgUrl, weather: weatherType }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistrationSubmit = ({ email, password, name, avatar }) => {
    if (!email || !password || !name || !avatar) {
      return Promise.reject(new Error("All fields are required"));
    }
    return auth
      .register(name, email, password, avatar)
      .then((userData) => {
        closeActiveModal();
        return userData;
      })
      .then(() => {
        handleLoginSubmit({ email, password });
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        return Promise.reject(err);
      });
  };

  const handleLoginSubmit = ({ email, password }) => {
    if (!email || !password) {
      return Promise.reject(new Error("Email and password are required"));
    }

    return auth
      .authorize(email, password)
      .then((data) => {
        const token = data.token;
        if (!token) {
          return Promise.reject(new Error("Login failed: no token"));
        }
        setToken(token);

        return auth.getCurrentUser(token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
        const redirectPath = location.state?.from?.pathname || "/profile";
        navigate(redirectPath);
        return userData;
      })
      .catch((err) => {
        console.error("Login failed:", err);
        return Promise.reject(err);
      });
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = getToken();

    if (!token) {
      return Promise.reject(
        new Error("You must be logged in to edit your profile")
      );
    }

    return editProfileInfo({ name, avatar }, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    const apiCall = isLiked ? removeCardLike : addCardLike;
    apiCall(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            item._id === updatedCard._id ? updatedCard : item
          )
        );
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    const token = getToken();
    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    auth
      .getCurrentUser(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        removeToken();
        setIsLoggedIn(false);
        setCurrentUser(null);
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              locationData={weatherData}
              handleRegistrationClick={handleRegistrationClick}
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      handleLogoutClick={handleLogoutClick}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteConfirmation={handleDeleteConfirmation}
          />
          <DeleteConfirmationModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onConfirmDelete={handleCardDelete}
          />
          <RegistrationModal
            isOpen={activeModal === "registration"}
            onClose={closeActiveModal}
            onRegistrationModalSubmit={handleRegistrationSubmit}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLoginModalSubmit={handleLoginSubmit}
            handleRegistrationClick={handleRegistrationClick}
          />
          <LogoutModal
            isOpen={activeModal === "logout"}
            onClose={closeActiveModal}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onEditProfileModalSubmit={handleEditProfileSubmit}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
