import HomeViewModel from "./Home.ViewModel";
import HomePageView from "./Home.View";

/**
 * The Home page component.
 * @constructor Crates a new Home page instance.
 */
const HomePage = () => {
    const viewModel = new HomeViewModel();
    return <HomePageView viewModel={viewModel} />
};

export default HomePage;