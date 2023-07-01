import { View, StyleSheet } from "react-native";
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import theme from "../theme";
import SignIn from "./SignIn";
import CreateReview from "./CreateReview";
import SingleRepositoryView from "./SingleRepositoryView";
import SignUp from "./SignUp";

const Main = () => {
  const styles = StyleSheet.create({
    container:{
      backgroundColor: theme.backgroundColors.backgroundSecondary,
      paddingBottom: 5,
      flexGrow: 1,
    },
  });

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/sign-in" element={<SignIn />} exact/>
        <Route path="/:id" element={<SingleRepositoryView/>}/>
        <Route path="/create-review" element={<CreateReview/>} exact/>
        <Route path="/sign-up" element={<SignUp/>} exact/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;