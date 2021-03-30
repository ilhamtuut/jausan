import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/HomePage/reducer";
import loginReducer from "../screens/Login/reducer";
import registerReducer from "../screens/Register/reducer";
import profileReducer from "../screens/Profile/reducer";
import formulirReducer from "../screens/Formulir/reducer";
import jadwalReducer from "../screens/Jadwal/reducer";
import categoryReducer from "../screens/Category/reducer";
import detailNewsReducer from "../screens/DetailNews/reducer";
import listNewsReducer from "../screens/ListNews/reducer";
import editProfileReducer from "../screens/EditProfile/reducer";
import passwordReducer from "../screens/ChangePassword/reducer";
import konsultasiReducer from "../screens/Konsultasi/Advokasi/reducer";
import tokohReducer from "../screens/Tokoh/ListTokoh/reducer";
import amaliyahReducer from "../screens/Amaliyah/reducer";
import amaliyahListReducer from "../screens/AmaliyahList/reducer";
import ngajiReducer from "../screens/Ngaji/reducer";
import khutbahReducer from "../screens/Khutbah/reducer";
import quoteReducer from "../screens/Quote/reducer";
import retailReducer from "../screens/Retail/reducer";

export default combineReducers({
	homeReducer,
	loginReducer,
	registerReducer,
	profileReducer,
	jadwalReducer,
	categoryReducer,
	detailNewsReducer,
	listNewsReducer,
	formulirReducer,
	editProfileReducer,
	passwordReducer,
	konsultasiReducer,
	tokohReducer,
	amaliyahReducer,
	amaliyahListReducer,
	ngajiReducer,
	khutbahReducer,
	quoteReducer,
	retailReducer,
	form: formReducer
});
