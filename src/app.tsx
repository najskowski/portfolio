import { Route, Switch } from "wouter";
import Home from "./routes/home";
import Banner from "./components/banner";
import Socials from "./components/socials";
import Navigation from "./components/navigation";
import Contact from "./routes/contact";
import Projects from "./routes/projects";

export function App() {
    return (
        <div className="mx-auto w-full max-w-2xl flex flex-col p-5 gap-5">
            <Navigation />
            <div className="w-full space-y-5">
                <Banner />
                <Socials />
            </div>
            <div className="w-full bg-black h-px" />
            <Switch>
                <Route path="/contact" component={Contact} />
                <Route path="/projects" component={Projects} />
                <Route path="*" component={Home} />
            </Switch>
        </div>
    );
}
