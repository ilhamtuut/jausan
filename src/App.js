import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Root } from "native-base";

import Main from "./Main";
import HomePage from "./screens/HomePage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import DetailNews from "./screens/DetailNews";
import DetailData from "./screens/DetailData";
import ListNews from "./screens/ListNews";
import Formulir from "./screens/Formulir";
import ListPendaftaran from "./screens/ListPendaftaran";
import Agenda from "./screens/Agenda";
import Amaliyah from "./screens/Amaliyah";
import AmaliyahList from "./screens/AmaliyahList";
import Khutbah from "./screens/Khutbah";
import Quote from "./screens/Quote";
import Ngaji from "./screens/Ngaji";
import DetailQuran from "./screens/DetailQuran";
import Jadwal from "./screens/Jadwal";
import Category from "./screens/Category";
import Settings from "./screens/Settings";
import Abouts from "./screens/Abouts";
import Organisasi from "./screens/Organisasi";
import StrukturOrganisasi from "./screens/StrukturOrganisasi";

// Profile
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import ChangePassword from "./screens/ChangePassword";

// Konsultasi
import Konsultasi from "./screens/Konsultasi/Advokasi";
import AddKonsultasi from "./screens/Konsultasi/AddKonsultasi";

// Tokoh
import Tokoh from "./screens/Tokoh/ListTokoh";
import DetailTokoh from "./screens/Tokoh/DetailTokoh";

// Retail
import Retail from "./screens/Retail";
import RetailDetail from "./screens/RetailDetail";

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);
global.access_token = '';
const MainNavigator = createStackNavigator(
  {
    // Main: { screen: Main },
    HomePage: { screen: HomePage },
    Login: { screen: Login },
    Register: { screen: Register },
    Profile: { screen: Profile },
    EditProfile: { screen: EditProfile },
    Formulir: { screen: Formulir },
    ListPendaftaran: { screen: ListPendaftaran },
    DetailData: { screen: DetailData },
    DetailNews: { screen: DetailNews },
    ListNews: { screen: ListNews },
    Konsultasi: { screen: Konsultasi },
    AddKonsultasi: { screen: AddKonsultasi },
    Agenda: { screen: Agenda },
    Amaliyah: { screen: Amaliyah },
    AmaliyahList: { screen: AmaliyahList },
    Khutbah: { screen: Khutbah },
    Quote: { screen: Quote },
    Ngaji: { screen: Ngaji },
    DetailQuran: { screen: DetailQuran },
    Retail: { screen: Retail },
    RetailDetail: { screen: RetailDetail },
    Tokoh: { screen: Tokoh },
    DetailTokoh: { screen: DetailTokoh },
    Category: { screen: Category },
    Jadwal: { screen: Jadwal },
    Settings: { screen: Settings },
    Abouts: { screen: Abouts },
    ChangePassword: { screen: ChangePassword },
    Organisasi: { screen: Organisasi },
    StrukturOrganisasi: { screen: StrukturOrganisasi },
  },
  {
    index: 0,
    initialRouteName: "HomePage",
    headerMode: "none"
  }
);

const App = createAppContainer(MainNavigator);

export default () =>
  <Root>
    <App />
  </Root>;
